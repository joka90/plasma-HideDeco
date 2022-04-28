build:
	rm -f .out.zip
	zip -r .out.zip metadata.desktop contents/
	mv .out.zip HideDeco.kwinscript

install:
	kpackagetool5 --type KWin/Script -i .

upgrade:
	kpackagetool5 --type KWin/Script -u .
