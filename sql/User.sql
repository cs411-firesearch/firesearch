/*CREATE TABLE*/
CREATE TABLE User(
	UserId INT NOT NULL AUTO_INCREMENT,
	Username varchar(20) not null,
	Email varchar(25),
	Balance FLOAT DEFAULT 0,
	Salt char(255) not null,
	Hash char(255) not null,
	PRIMARY KEY(UserId)
);

INSERT INTO User(
Username,Email,Balance,Salt,Hash
)
VALUES
(
'Xueting Yan','firesearchadm@gmail.com',0.00, 'qu/reI8YLdpEJR+dg+XPJgMw2vf/WC5gRGYTap6CzCF+V7c78IxYidR9vUeOotYfndRkunKlfaCNO0ugUFaoeWhHPU3JPT+GZhGZczjK7sDSo4ZQBnQTpwXgWgK+y5pXgzgyUkpvZW1OxFWbpZ4JTilWaorgL/xqNA/7rI8ZxpM=','VGqrw4NjAQKG2Kz52o5vE8IxniwxKXoKrpZRaxVIuHgPhShn2sixh+J+inYF1NFKpfYG/aJVLHKIrMNaPh+oWZinZQu3VUNL6C5dNz3f/QFBps1XcsKNnuIgnkpbsLRFaTSwYCE2Flh4rWrgLAbql0gLjVbnImM34IQhUVjfl4k=');

INSERT INTO User(
Username,Email,Balance,Salt,Hash
)
VALUES
(
'Haozhen Ding','firesearchadm@gmail.com',0.00,'qu/reI8YLdpEJR+dg+XPJgMw2vf/WC5gRGYTap6CzCF+V7c78IxYidR9vUeOotYfndRkunKlfaCNO0ugUFaoeWhHPU3JPT+GZhGZczjK7sDSo4ZQBnQTpwXgWgK+y5pXgzgyUkpvZW1OxFWbpZ4JTilWaorgL/xqNA/7rI8ZxpM=','VGqrw4NjAQKG2Kz52o5vE8IxniwxKXoKrpZRaxVIuHgPhShn2sixh+J+inYF1NFKpfYG/aJVLHKIrMNaPh+oWZinZQu3VUNL6C5dNz3f/QFBps1XcsKNnuIgnkpbsLRFaTSwYCE2Flh4rWrgLAbql0gLjVbnImM34IQhUVjfl4k=');

INSERT INTO User(
Username,Email,Balance,Salt,Hash
)
VALUES
(
'Bei Zhang','firesearchadm@gmail.com',0.00,'qu/reI8YLdpEJR+dg+XPJgMw2vf/WC5gRGYTap6CzCF+V7c78IxYidR9vUeOotYfndRkunKlfaCNO0ugUFaoeWhHPU3JPT+GZhGZczjK7sDSo4ZQBnQTpwXgWgK+y5pXgzgyUkpvZW1OxFWbpZ4JTilWaorgL/xqNA/7rI8ZxpM=','VGqrw4NjAQKG2Kz52o5vE8IxniwxKXoKrpZRaxVIuHgPhShn2sixh+J+inYF1NFKpfYG/aJVLHKIrMNaPh+oWZinZQu3VUNL6C5dNz3f/QFBps1XcsKNnuIgnkpbsLRFaTSwYCE2Flh4rWrgLAbql0gLjVbnImM34IQhUVjfl4k=');

INSERT INTO User(
Username,Email,Balance,Salt,Hash
)
VALUES
(
'Jiahua Wei','firesearchadm@gmail.com',0.00,'qu/reI8YLdpEJR+dg+XPJgMw2vf/WC5gRGYTap6CzCF+V7c78IxYidR9vUeOotYfndRkunKlfaCNO0ugUFaoeWhHPU3JPT+GZhGZczjK7sDSo4ZQBnQTpwXgWgK+y5pXgzgyUkpvZW1OxFWbpZ4JTilWaorgL/xqNA/7rI8ZxpM=','VGqrw4NjAQKG2Kz52o5vE8IxniwxKXoKrpZRaxVIuHgPhShn2sixh+J+inYF1NFKpfYG/aJVLHKIrMNaPh+oWZinZQu3VUNL6C5dNz3f/QFBps1XcsKNnuIgnkpbsLRFaTSwYCE2Flh4rWrgLAbql0gLjVbnImM34IQhUVjfl4k=');