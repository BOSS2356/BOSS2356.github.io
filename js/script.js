// DOM元素获取
const modal = document.getElementById('support-modal');
const closeModal = document.getElementById('close-modal');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navbarNav = document.querySelector('.navbar-nav');
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');
const navbar = document.querySelector('.navbar');

// 支持弹窗功能
function initModal() {
    // 检查localStorage是否已关闭过弹窗
    if (!localStorage.getItem('modalClosed')) {
        modal.style.display = 'flex';
    }

    // 关闭弹窗
    closeModal.addEventListener('click', () => {
        modal.style.animation = 'fadeIn 0.3s ease reverse';
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
        // 存储到localStorage
        localStorage.setItem('modalClosed', 'true');
    });

    // 点击弹窗外部关闭
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.animation = 'fadeIn 0.3s ease reverse';
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
            localStorage.setItem('modalClosed', 'true');
        }
    });
}

// 移动端菜单功能
function initMobileMenu() {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navbarNav.classList.toggle('active');
    });
}

// 搜索功能
function initSearch() {
    // 模拟搜索数据
    const searchData = {
        artists: [
            { id: 1, name: '罗大佑', image: '${image_url_placeholder}', type: 'artist' },
            { id: 2, name: '达明一派', image: '${image_url_placeholder}', type: 'artist' },
            { id: 3, name: '陈升', image: '${image_url_placeholder}', type: 'artist' }
        ],
        albums: [
            { id: 1, name: '童年', artist: '罗大佑', image: '${image_url_placeholder}', type: 'album' },
            { id: 2, name: '今天应该很高兴', artist: '达明一派', image: '${image_url_placeholder}', type: 'album' },
            { id: 3, name: '把悲伤留给自己', artist: '陈升', image: '${image_url_placeholder}', type: 'album' }
        ],
        tracks: [
            { id: 1, name: '童年', artist: '罗大佑', type: 'track' },
            { id: 2, name: '东方之珠', artist: '罗大佑', type: 'track' },
            { id: 3, name: '禁色', artist: '达明一派', type: 'track' },
            { id: 4, name: '今天应该很高兴', artist: '达明一派', type: 'track' },
            { id: 5, name: '把悲伤留给自己', artist: '陈升', type: 'track' },
            { id: 6, name: '张三的歌', artist: '陈升', type: 'track' }
        ]
    };

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        if (query.length === 0) {
            searchResults.classList.remove('show');
            return;
        }

        // 搜索逻辑
        const results = [];
        
        // 搜索音乐人
        searchData.artists.forEach(artist => {
            if (artist.name.toLowerCase().includes(query)) {
                results.push(artist);
            }
        });

        // 搜索专辑
        searchData.albums.forEach(album => {
            if (album.name.toLowerCase().includes(query)) {
                results.push(album);
            }
        });

        // 搜索歌曲
        searchData.tracks.forEach(track => {
            if (track.name.toLowerCase().includes(query)) {
                results.push(track);
            }
        });

        // 显示搜索结果
        displaySearchResults(results);
    });

    // 点击外部关闭搜索结果
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.classList.remove('show');
        }
    });
}

// 显示搜索结果
function displaySearchResults(results) {
    searchResults.innerHTML = '';
    
    if (results.length === 0) {
        searchResults.innerHTML = '<div class="search-result-item">无搜索结果</div>';
        searchResults.classList.add('show');
        return;
    }

    results.forEach(result => {
        const item = document.createElement('div');
        item.className = 'search-result-item';
        
        let imageHtml = '';
        if (result.image) {
            imageHtml = `<img src="${result.image}" alt="${result.name}">`;
        }
        
        let contentHtml = '';
        if (result.type === 'artist') {
            contentHtml = `<div><strong>${result.name}</strong><br><small>音乐人</small></div>`;
        } else if (result.type === 'album') {
            contentHtml = `<div><strong>${result.name}</strong><br><small>${result.artist}</small></div>`;
        } else if (result.type === 'track') {
            contentHtml = `<div><strong>${result.name}</strong><br><small>${result.artist}</small></div>`;
        }
        
        item.innerHTML = imageHtml + contentHtml;
        
        // 添加点击事件
        item.addEventListener('click', () => {
            if (result.type === 'artist') {
                window.location.href = `/artist/${result.id}`;
            } else if (result.type === 'album') {
                window.location.href = `/album/${result.id}`;
            }
        });
        
        searchResults.appendChild(item);
    });
    
    searchResults.classList.add('show');
}

// 图片懒加载
function initLazyLoad() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// 导航栏滚动效果
function initNavbarScroll() {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(18, 18, 18, 0.98)';
        } else {
            navbar.style.backgroundColor = 'rgba(18, 18, 18, 0.95)';
        }
    });
}

// 页面切换动画
function initPageTransition() {
    // 为所有链接添加点击事件
    const links = document.querySelectorAll('a[href]');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            // 只处理站内链接
            if (link.href.startsWith(window.location.origin)) {
                e.preventDefault();
                document.body.style.animation = 'fadeIn 0.3s ease reverse';
                setTimeout(() => {
                    window.location.href = link.href;
                }, 300);
            }
        });
    });
}

// 艺人卡片点击事件
function initArtistCards() {
    const artistCards = document.querySelectorAll('.artist-card');
    const artistImages = document.querySelectorAll('.artist-image');
    
    // 为卡片添加点击事件
    artistCards.forEach(card => {
        card.addEventListener('click', () => {
            navigateToArtistPage(card);
        });
        
        // 添加光标指针样式
        card.style.cursor = 'pointer';
    });
    
    // 为图片添加点击事件
    artistImages.forEach(img => {
        img.addEventListener('click', (e) => {
            e.stopPropagation(); // 阻止事件冒泡
            const card = img.closest('.artist-card');
            navigateToArtistPage(card);
        });
        
        // 添加光标指针样式
        img.style.cursor = 'pointer';
    });
}

// 导航到艺人页面
function navigateToArtistPage(card) {
    const artistName = card.querySelector('.artist-name').textContent;
    let artistId = '';
    
    // 根据艺人名称确定ID
    switch(artistName) {
        case '罗大佑':
            artistId = '1';
            break;
        case '达明一派':
            artistId = '2';
            break;
        case '陈升':
            artistId = '3';
            break;
        default:
            artistId = '1';
    }
    
    // 页面切换动画
    document.body.style.animation = 'fadeIn 0.3s ease reverse';
    setTimeout(() => {
        window.location.href = `artist.html?id=${artistId}`;
    }, 300);
}

// 导航到专辑页面
function navigateToAlbumPage(card) {
    console.log('导航到专辑页面');
    const albumName = card.querySelector('.album-name').textContent;
    let albumId = '';
    
    // 根据专辑名称确定ID
    switch(albumName) {
        case '《拥挤的乐园》':
            albumId = '1';
            break;
        default:
            albumId = '1';
    }
    
    console.log('专辑ID:', albumId);
    console.log('跳转URL:', `album.html?id=${albumId}`);
    
    // 直接跳转，不使用动画
    window.location.href = `album.html?id=${albumId}`;
}

// 专辑卡片点击事件
function initAlbumCards() {
    console.log('初始化专辑卡片点击事件');
    const albumCards = document.querySelectorAll('.album-card');
    const albumImages = document.querySelectorAll('.album-cover');
    
    console.log('找到专辑卡片数量:', albumCards.length);
    console.log('找到专辑图片数量:', albumImages.length);
    
    // 为卡片添加点击事件
    albumCards.forEach(card => {
        console.log('为专辑卡片添加点击事件');
        card.addEventListener('click', () => {
            console.log('专辑卡片被点击');
            navigateToAlbumPage(card);
        });
        
        // 添加光标指针样式
        card.style.cursor = 'pointer';
    });
    
    // 为图片添加点击事件
    albumImages.forEach(img => {
        console.log('为专辑图片添加点击事件');
        img.addEventListener('click', (e) => {
            console.log('专辑图片被点击');
            e.stopPropagation(); // 阻止事件冒泡
            const card = img.closest('.album-card');
            navigateToAlbumPage(card);
        });
        
        // 添加光标指针样式
        img.style.cursor = 'pointer';
    });
}

// 初始化所有功能
function initApp() {
    initModal();
    initMobileMenu();
    initSearch();
    initLazyLoad();
    initNavbarScroll();
    initPageTransition();
    initArtistCards();
    initAlbumCards();
}

// 显示捐赠提示弹窗
function showDonationPrompt(albumName) {
    // 根据专辑名称跳转到不同的页面
    if (albumName === '关于男人特辑') {
        // 跳转到密码页面
        window.location.href = 'password.html';
    } else {
        // 其他专辑直接跳转到下载链接
        let url = '';
        
        switch(albumName) {
            case '拥挤的乐园':
                url = 'https://url93.ctfile.com/f/12622393-552513158-976323?p=626386';
                break;
            default:
                url = 'https://url93.ctfile.com/f/12622393-552513158-976323?p=626386';
        }
        
        // 跳转到对应的链接
        window.open(url, '_blank');
    }
}

// 页面加载完成后初始化
window.addEventListener('DOMContentLoaded', initApp);