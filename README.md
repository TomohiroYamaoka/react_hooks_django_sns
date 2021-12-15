# react_hooks_django_sns

# 開発環境

初期環境は下記の通り　　
https://github.com/TomohiroYamaoka/react_hooks_django_test

## Django の静的ファイルを Google Storage に管理する方法

https://blog.daisukekonishi.com/post/django-storages/

## 構造

config : Django の基本的な設定。  
core : DB の管理

## User モデル

email  
password

## Profile

userPro  
nickName  
created_on  
img

## FriendRequest

askForm  
askTo  
approved

## Message

sender
receiver
message

## url

api/user/create(POST)  
新規ユーザーアカウント作成

api/user/profile(CRUD)

api/user/myprofile(GET)  
ログインユーザー自身のプロフィール確認

api/user/approval(POST/GET/PUT)  
友達申請の作成と承諾

api/user/inbox(GET)  
自分宛のダイレクトメッセージ

api/user/inbox(POST)  
ダイレクトメッセージ送信

##

画像ファイルを扱う ⇨pillow を追加
