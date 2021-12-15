from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.conf import settings


def upload_path(instance, filename):
    ext = filename.split('.')[-1]
    return '/'.join(['image', str(instance.userPro.id)+str(instance.nickName)+str(ext)])


class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('email is must')

        # normalize_emailで入力されたemailを正規化(大文字で入ってきたら全部小文字に直したりする)する
        user = self.model(email=self.normalize_email(email), **extra_fields)
        # set_password関数でパッスワードをハッシュ化させる。
        user.set_password(password)
        # ユーザーの情報をsaveする
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password):
        user = self.create_user(email, password)
        user.is_staff = True
        user.is_superuser = True
        #　saveしてDBに登録
        user.save(using=self._db)

        return user


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=50, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'

    def __str__(self):
        return self.email


class Profile(models.Model):

    nickName = models.CharField(max_length=20)
    # １つのUserに対して１つのProfileを紐づける
    userPro = models.OneToOneField(
        settings.AUTH_USER_MODEL, related_name='userPro',
        # Userが消えたらここも紐付けで削除されるようにする
        on_delete=models.CASCADE
    )
    created_on = models.DateTimeField(auto_now_add=True)
    img = models.ImageField(blank=True, null=True, upload_to=upload_path)

    def __str__(self):
        return self.nickName


class FriendRequest(models.Model):
    askFrom = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name='askFrom',
        on_delete=models.CASCADE
    )
    askTo = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name='askTo',
        on_delete=models.CASCADE
    )
    approved = models.BooleanField(default=False)

    # 2回以降の申請は弾かれるようになる
    # class文の中に入れ子でMetaという名前のclass文を定義しておくと、
    # そこから情報を読み取って定義しているクラスにデータベースアクセスに関連する追加の情報や機能を差し挟んでくれる
    class Meta:
        unique_together = (('askFrom', 'askTo'),)

    def __str__(self):
        return str(self.askForm)+'===='+str(self.askTo)


class Message(models.Model):
    message = models.CharField(max_length=140)
    sender = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name='sender',
        on_delete=models.CASCADE
    )
    receiver = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name='receiver',
        on_delete=models.CASCADE
    )

    def __str__(self):
        return self.sender
