#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
获取Spotify歌单专辑的简单脚本
"""

import json
import sys
try:
    import requests
except ImportError:
    print("需要安装requests库，请运行:")
    print("pip install requests")
    sys.exit(1)

# Spotify凭证
CLIENT_ID = '892df114831a40d8bec7a3f20f3c8a36'
CLIENT_SECRET = '3b4a661e0667464e8b29e79a250895f3'
PLAYLIST_ID = '64kqgjsEoG93D7WToOVG6R'

def get_access_token():
    """获取Spotify访问令牌"""
    url = 'https://accounts.spotify.com/api/token'
    data = {'grant_type': 'client_credentials'}
    
    try:
        response = requests.post(url, data=data, auth=(CLIENT_ID, CLIENT_SECRET))
        response.raise_for_status()
        token = response.json()['access_token']
        print("✅ 成功获取访问令牌")
        return token
    except Exception as e:
        print(f"❌ 获取访问令牌失败: {e}")
        return None

def get_playlist(token, playlist_id):
    """获取歌单数据"""
    url = f'https://api.spotify.com/v1/playlists/{playlist_id}'
    headers = {'Authorization': f'Bearer {token}'}
    
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        print(f"✅ 成功获取歌单数据")
        return response.json()
    except Exception as e:
        print(f"❌ 获取歌单失败: {e}")
        return None

def extract_albums(playlist_data):
    """从歌单中提取专辑信息"""
    album_map = {}
    
    if not playlist_data or 'tracks' not in playlist_data:
        return []
    
    for item in playlist_data['tracks']['items']:
        track = item.get('track')
        if not track:
            continue
        
        album = track.get('album')
        if not album:
            continue
        
        album_name = album.get('name')
        if not album_name or album_name in album_map:
            continue
        
        # 获取专辑封面
        cover_url = None
        if album.get('images') and len(album['images']) > 0:
            cover_url = album['images'][0]['url']
        
        # 获取歌手
        artists = []
        if album.get('artists'):
            artists = [artist.get('name', '') for artist in album['artists']]
        
        # 获取发行年份
        release_year = None
        if album.get('release_date'):
            release_year = album['release_date'].split('-')[0]
        
        album_map[album_name] = {
            'title': album_name,
            'artist': ', '.join(artists),
            'cover': cover_url,
            'year': release_year
        }
    
    return list(album_map.values())

def main():
    print("=" * 50)
    print("🎵 Spotify 歌单专辑获取器")
    print("=" * 50)
    
    # 获取访问令牌
    token = get_access_token()
    if not token:
        return
    
    # 获取歌单
    playlist_data = get_playlist(token, PLAYLIST_ID)
    if not playlist_data:
        return
    
    # 提取专辑
    albums = extract_albums(playlist_data)
    print(f"\n🎨 找到 {len(albums)} 张专辑!")
    
    # 显示专辑信息
    print("\n📋 专辑列表:")
    print("-" * 50)
    for i, album in enumerate(albums, 1):
        print(f"{i}. {album['title']} - {album['artist']}")
        if album['year']:
            print(f"   ({album['year']})")
        print()
    
    # 生成JavaScript代码
    print("\n💻 生成的JavaScript代码:")
    print("-" * 50)
    js_code = "        const albums = [\n"
    for album in albums:
        js_code += f"            {{\n"
        js_code += f"                title: '{album['title']}',\n"
        js_code += f"                artist: '{album['artist']}',\n"
        if album['year']:
            js_code += f"                year: '{album['year']}',\n"
        js_code += f"                cover: '{album['cover']}'\n"
        js_code += f"            }},\n"
    js_code += "        ];"
    print(js_code)
    
    # 保存到文件
    output_file = 'my_albums.js'
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(js_code)
    print(f"\n✅ 已保存到: {output_file}")
    print("\n请把上面的代码复制到 index.html 中替换原来的 albums 数组!")

if __name__ == '__main__':
    main()
