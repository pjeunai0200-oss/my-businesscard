/* ==========================================================================
   따뜻한 손뜨개 공방 - 웹 명함 & 이력서 JS (script.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.app-container');
    const toggleBtn = document.getElementById('toggle-btn');
    const buttonText = toggleBtn.querySelector('.button-text');
    const avatar = document.getElementById('main-avatar');
    
    /**
     * 프로필 사진의 위치와 크기를 현재 모드의 placeholder에 정확히 맞추는 함수
     * @param {boolean} instantly true일 경우 애니메이션(transition) 없이 즉시 위치를 잡습니다. (첫 로드/창 크기 조절 시 사용)
     */
    function syncAvatarPosition(instantly = false) {
        const isResume = container.classList.contains('is-resume');
        
        // 현재 활성화된 모드에 맞는 placeholder 요소를 가져옵니다.
        const targetPlaceholder = isResume 
            ? document.querySelector('.photo-placeholder-resume')
            : document.querySelector('.photo-placeholder-card');
            
        if (!targetPlaceholder) return;
        
        // 컨테이너와 타겟의 절대 좌표를 가져와 컨테이너 내 상대 좌표를 구합니다.
        const containerRect = container.getBoundingClientRect();
        const targetRect = targetPlaceholder.getBoundingClientRect();
        
        const top = targetRect.top - containerRect.top;
        const left = targetRect.left - containerRect.left;
        const width = targetRect.width;
        const height = targetRect.height;
        
        // instantly가 true이면 transition 효과를 일시적으로 끕니다.
        if (instantly) {
            avatar.style.transition = 'none';
        } else {
            avatar.style.transition = ''; // style.css에 정의된 부드러운 transition 적용
        }
        
        // 사진의 스타일 값(위치, 크기, 테두리 둥글기)을 변경합니다.
        avatar.style.top = `${top}px`;
        avatar.style.left = `${left}px`;
        avatar.style.width = `${width}px`;
        avatar.style.height = `${height}px`;
        
        if (isResume) {
            avatar.style.borderRadius = '50%'; // 이력서 모드일 때는 동그랗게 쏙!
        } else {
            avatar.style.borderRadius = '30px'; // 명함 모드일 때는 둥글둥글한 사각형!
        }
        
        // transition을 껐던 경우, 레이아웃 강제 갱신 후 다시 원래 상태로 돌려놓습니다.
        if (instantly) {
            avatar.offsetHeight; // 리플로우(Reflow) 발생으로 즉시 렌더링 반영
            avatar.style.transition = '';
        }
    }
    
    // 1. 버튼 클릭 시 화면 모드 전환
    toggleBtn.addEventListener('click', () => {
        container.classList.toggle('is-resume');
        
        // 활성화된 모드에 따라 버튼 텍스트 변경
        if (container.classList.contains('is-resume')) {
            buttonText.textContent = '명함 보기';
        } else {
            buttonText.textContent = '이력서 보기';
        }
        
        // 모드 전환에 맞춰 사진 위치 동기화 (애니메이션 적용)
        syncAvatarPosition();
    });
    
    // 2. 화면 크기가 변경될 때 (모바일 가로세로 회전, 브라우저 크기 조절 등)
    // 이 때는 애니메이션 없이 즉시 사진 위치를 정확하게 보정해 줍니다.
    window.addEventListener('resize', () => {
        syncAvatarPosition(true);
    });
    
    // 3. 첫 로드 시 바로 사진 위치 안착
    // 폰트나 이미지가 모두 로드된 직후 정확한 좌표를 잡기 위해 약간의 지연 후 실행합니다.
    setTimeout(() => {
        syncAvatarPosition(true);
    }, 100);
});
