document.addEventListener('DOMContentLoaded', () => {
    let allTerms = [];
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const searchResultsArea = document.querySelector('.search-results-area');
    const allTermsArea = document.querySelector('.all-terms-area');
    const searchResultsList = document.getElementById('searchResultsList');
    const searchResultCount = document.getElementById('searchResultCount');
    const totalResultCount = document.getElementById('totalResultCount');
    const scrollableList = document.getElementById('scrollableList');

    // 모달 요소
    const termModal = document.getElementById('termModal');
    const modalTermTitle = document.getElementById('modalTermTitle');
    const modalTermDesc = document.getElementById('modalTermDesc');
    const closeBtn = document.querySelector('.close-btn');

    // 데이터 가져오기
    fetch('./data.json')
        .then(response => response.json())
        .then(data => {
            allTerms = data;
            totalResultCount.textContent = `(총 ${allTerms.length}건)`;
            renderAllTerms(allTerms);
        })
        .catch(error => console.error('Error fetching terms:', error));

    let currentFocus = -1;

    // 검색 이벤트
    searchInput.addEventListener('input', () => {
        handleSearch(searchInput.value);
    });

    // 키보드 네비게이션
    searchInput.addEventListener('keydown', function(e) {
        if (searchResultsArea.style.display === 'none') return;
        
        // 검색 결과 항목(term-item) 또는 결과가 없을 때의 외부 링크(external-link)를 모두 탐색 대상 배열로 잡음
        const items = searchResultsList.querySelectorAll('.term-item:not(.no-result-item), .external-link');
        if (items.length === 0) return;

        // 한글 조합 중 방향키 이벤트 무시 (버그 방지)
        if (e.isComposing && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) return;

        if (e.key === 'ArrowDown') {
            currentFocus++;
            addActive(items);
            e.preventDefault(); // 검색창에서 커서가 맨 앞으로/뒤로 가는 것 방지
        } else if (e.key === 'ArrowUp') {
            currentFocus--;
            addActive(items);
            e.preventDefault();
        } else if (e.key === 'Enter') {
            e.preventDefault(); // 폼 제출 등 기본 동작 방지
            if (currentFocus > -1) {
                if (items[currentFocus]) items[currentFocus].click(); // 선택된 항목 클릭 처리 (a 태그 이동 포함)
            }
        }
    });

    function addActive(items) {
        if (!items || items.length === 0) return false;
        removeActive(items);
        if (currentFocus >= items.length) currentFocus = 0; // 끝에 도달하면 처음으로
        if (currentFocus < 0) currentFocus = (items.length - 1); // 처음에 도달하면 끝으로
        items[currentFocus].classList.add("autocomplete-active");
        // 리스트 스크롤이 선택된 항목을 따라가도록 처리
        items[currentFocus].scrollIntoView({ block: "nearest" });
    }

    function removeActive(items) {
        for (let i = 0; i < items.length; i++) {
            items[i].classList.remove("autocomplete-active");
        }
    }
    
    // 검색창 클릭 시 값이 있으면 다시 열기
    searchInput.addEventListener('click', () => {
        if (searchInput.value.trim() !== '') {
            handleSearch(searchInput.value);
        }
    });

    // 외부 클릭 시 드롭다운 닫기
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchResultsArea.contains(e.target) && e.target !== searchBtn) {
            searchResultsArea.style.display = 'none';
        }
    });

    searchBtn.addEventListener('click', () => {
        handleSearch(searchInput.value);
    });

    // 한글 초성 추출 함수
    function getChosung(word) {
        const cho = ["ㄱ","ㄲ","ㄴ","ㄷ","ㄸ","ㄹ","ㅁ","ㅂ","ㅃ","ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];
        let result = "";
        for(let i=0; i<word.length; i++) {
            let code = word.charCodeAt(i) - 44032;
            if(code > -1 && code < 11172) result += cho[Math.floor(code/588)];
            else result += word.charAt(i);
        }
        return result;
    }

    // 용어 그룹화 (가나다 순)
    function groupTermsByInitial(terms) {
        const groups = {};
        
        // 정렬
        const sortedTerms = [...terms].sort((a, b) => a.title.localeCompare(b.title));

        sortedTerms.forEach(term => {
            let initial = '기타';
            if (term.title) {
                // 첫 글자의 초성 추출. 알파벳이나 기호로 시작하면 처리
                const firstChar = term.title.trim().replace(/^[\(\[\{]/, '').charAt(0); // 괄호 무시
                
                const code = firstChar.charCodeAt(0) - 44032;
                if(code > -1 && code < 11172) {
                    const cho = ["ㄱ","ㄲ","ㄴ","ㄷ","ㄸ","ㄹ","ㅁ","ㅂ","ㅃ","ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];
                    initial = cho[Math.floor(code/588)];
                    // 쌍자음은 기본 자음으로 편입 (예: ㄲ -> ㄱ)
                    if(initial === 'ㄲ') initial = 'ㄱ';
                    if(initial === 'ㄸ') initial = 'ㄷ';
                    if(initial === 'ㅃ') initial = 'ㅂ';
                    if(initial === 'ㅆ') initial = 'ㅅ';
                    if(initial === 'ㅉ') initial = 'ㅈ';
                } else if(/[a-zA-Z]/.test(firstChar)) {
                    initial = 'A-Z';
                } else if(/[0-9]/.test(firstChar)) {
                    initial = '0-9';
                }
            }
            
            if (!groups[initial]) {
                groups[initial] = [];
            }
            groups[initial].push(term);
        });

        // '기타', 'A-Z', '0-9'는 맨 뒤로 정렬하기 위한 로직
        const orderedKeys = Object.keys(groups).sort((a, b) => {
            const special = ['A-Z', '0-9', '기타'];
            if (special.includes(a) && !special.includes(b)) return 1;
            if (!special.includes(a) && special.includes(b)) return -1;
            return a.localeCompare(b);
        });

        return { groups, orderedKeys };
    }

    // 아이템 렌더링 함수
    function createTermItemHTML(term) {
        return `
            <li class="term-item" data-id="${term.id}">
                <div class="term-title">${term.title}</div>
                <div class="term-summary">${term.description}</div>
            </li>
        `;
    }

    // 전체 리스트 렌더링
    function renderAllTerms(terms) {
        const { groups, orderedKeys } = groupTermsByInitial(terms);
        scrollableList.innerHTML = '';
        
        const quickNav = document.getElementById('quickNav');
        quickNav.innerHTML = '';

        orderedKeys.forEach(key => {
            // 1. 퀵 네비게이션 버튼 생성
            const navBtn = document.createElement('button');
            navBtn.className = 'quick-nav-btn';
            navBtn.textContent = key;
            navBtn.onclick = () => {
                const targetGroup = document.getElementById(`group-${key}`);
                if (targetGroup) {
                    scrollableList.scrollTo({
                        top: targetGroup.offsetTop,
                        behavior: 'smooth'
                    });
                }
            };
            quickNav.appendChild(navBtn);

            // 2. 용어 그룹 생성
            const groupDiv = document.createElement('div');
            groupDiv.className = 'dictionary-group';
            groupDiv.id = `group-${key}`; // 스크롤 이동을 위한 ID 부여
            
            let listHTML = `<ul class="term-list">`;
            groups[key].forEach(term => {
                listHTML += createTermItemHTML(term);
            });
            listHTML += `</ul>`;

            groupDiv.innerHTML = `
                <div class="group-label">${key}</div>
                ${listHTML}
            `;
            scrollableList.appendChild(groupDiv);
        });

        attachModalEvents();
    }

    // 검색 결과 렌더링
    function handleSearch(query) {
        const q = query.trim().toLowerCase();
        
        if (q === '') {
            searchResultsArea.style.display = 'none';
            return;
        }

        const filtered = allTerms.filter(term => 
            term.title.toLowerCase().includes(q) || 
            term.description.toLowerCase().includes(q)
        );

        searchResultCount.textContent = `(${filtered.length}건)`;
        searchResultsList.innerHTML = '';

        if (filtered.length > 0) {
            filtered.forEach(term => {
                searchResultsList.innerHTML += createTermItemHTML(term);
            });
        } else {
            const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
            const geminiUrl = `https://gemini.google.com/app`; 
            
            searchResultsList.innerHTML = `
                <li class="term-item no-result-item">
                    <div class="term-title" style="color: var(--error-color); margin-bottom: 0.5rem;">검색 결과가 없습니다.</div>
                    <div class="term-summary" style="margin-bottom: 1rem;">'${query}'에 대한 소방 용어를 찾지 못했습니다. 외부에서 검색해 보시겠어요?</div>
                    <div class="external-search-links">
                        <a href="${googleUrl}" target="_blank" class="external-link google-link">
                            🔍 구글(Google)에서 검색하기
                        </a>
                        <a href="${geminiUrl}" target="_blank" class="external-link gemini-link">
                            ✨ 제미나이(Gemini)에게 물어보기
                        </a>
                    </div>
                </li>
            `;
        }

        searchResultsArea.style.display = 'block';
        attachModalEvents();
    }

    // 모달 이벤트 부착
    function attachModalEvents() {
        const items = document.querySelectorAll('.term-item');
        items.forEach(item => {
            item.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                const term = allTerms.find(t => t.id === id) || allTerms.find(t => t.title === this.querySelector('.term-title').textContent);
                if (term) {
                    openModal(term);
                }
            });
        });
    }

    // 모달 열기
    function openModal(term) {
        modalTermTitle.textContent = term.title;
        
        // 줄바꿈 처리 (\r\n 또는 \n을 <br>로)
        const descHTML = term.description.replace(/\n/g, '<br>');
        modalTermDesc.innerHTML = descHTML;
        
        termModal.style.display = "block";
        
        // 클릭 시 자동완성 텍스트 검색창에 채우기 및 드롭다운 닫기
        searchInput.value = term.title;
        searchResultsArea.style.display = 'none';
    }

    // 모달 닫기
    closeBtn.onclick = function() {
        termModal.style.display = "none";
    }
    window.onclick = function(event) {
        if (event.target == termModal) {
            termModal.style.display = "none";
        }
    }

    // ════════════════════════════════════════════
    // Theme Management
    // ════════════════════════════════════════════
    const themeToggleBtn = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'light') {
        document.body.classList.replace('dark-theme', 'light-theme');
        if (themeToggleBtn) themeToggleBtn.checked = true;
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('change', (e) => {
            if (e.target.checked) {
                document.body.classList.replace('dark-theme', 'light-theme');
                localStorage.setItem('theme', 'light');
            } else {
                document.body.classList.replace('light-theme', 'dark-theme');
                localStorage.setItem('theme', 'dark');
            }
        });
    }
});
