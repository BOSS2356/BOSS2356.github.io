const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = 3000;

// 启用CORS
app.use(cors());

// Spotify凭证
const SPOTIFY_CLIENT_ID = '892df114831a40d8bec7a3f20f3c8a36';
const SPOTIFY_CLIENT_SECRET = '3b4a661e0667464e8b29e79a250895f3';

// 缓存token缓存
let cachedAccessToken = null;
let tokenExpiryTime = 0;

// 获取Spotify访问令牌
async function getSpotifyAccessToken() {
    const now = Date.now();
    
    // 如果token还在有效期内，直接返回缓存的
    if (cachedAccessToken && now < tokenExpiryTime) {
        return cachedAccessToken;
    }
    
    try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + Buffer.from(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString('base64')
            },
            body: 'grant_type=client_credentials'
        });
        
        if (!response.ok) {
            throw new Error('无法获取access token');
        }
        
        const data = await response.json();
        cachedAccessToken = data.access_token;
        tokenExpiryTime = now + (data.expires_in * 1000) - 60000; // 提前1分钟过期
        
        console.log('成功获取Spotify access token');
        return cachedAccessToken;
    } catch (error) {
        console.error('获取Spotify access token失败:', error);
        throw error;
    }
}

// 获取歌单数据
async function getSpotifyPlaylist(accessToken, playlistId) {
    try {
        const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        
        if (!response.ok) {
            throw new Error(`无法获取歌单: HTTP ${response.status}`);
        }
        
        const data = await response.json();
        console.log('成功获取歌单数据');
        return data;
    } catch (error) {
        console.error('获取Spotify歌单失败:', error);
        throw error;
    }
}

// API路由 - 获取歌单专辑
app.get('/api/playlist/:playlistId', async (req, res) => {
    try {
        const { playlistId } = req.params;
        console.log('获取歌单:', playlistId);
        
        const accessToken = await getSpotifyAccessToken();
        const playlistData = await getSpotifyPlaylist(accessToken, playlistId);
        
        // 提取专辑信息并去重
        const albumMap = new Map();
        
        if (playlistData.tracks && playlistData.tracks.items) {
            playlistData.tracks.items.forEach(item => {
                const track = item.track;
                if (!track) return;
                
                if (track.album && track.album.name && track.album.images && track.album.images.length > 0) {
                    const albumName = track.album.name;
                    if (!albumMap.has(albumName)) {
                        const artists = track.artists ? track.artists.map(a => a.name).join(', ');
                        const cover = track.album.images[0].url;
                        let releaseYear = null;
                        if (track.album.release_date) {
                            releaseYear = track.album.release_date.substring(0, 4);
                        }
                        
                        albumMap.set(albumName, {
                            title: albumName,
                            artist: artists,
                            cover: cover,
                            year: releaseYear
                        });
                    }
                }
            });
        }
        
        const albums = Array.from(albumMap.values());
        console.log('提取到', albums.length, '张专辑');
        
        res.json({
            success: true,
            playlistName: playlistData.name,
            albums: albums
        });
        
    } catch (error) {
        console.error('处理请求失败:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// 静态文件服务
app.use(express.static('.'));

// 启动服务器
app.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`);
    console.log(`访问 http://localhost:${PORT}/index.html 查看博客');
});
