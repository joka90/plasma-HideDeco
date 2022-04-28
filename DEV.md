# Dev notes

https://www.reddit.com/r/kde/comments/js3ze6/developing_a_kwin_script/
For testing open System Settings and disable the script and click apply, then enable the script and click apply. Doing it that way will unregister any signal handlers (event listeners).
https://techbase.kde.org/Development/Tutorials/KWin/Scripting

	ln -s ~/.local/share/kwin/scripts/HideDeco/metadata.desktop ~/.local/share/kservices5/HideDeco.desktop
	kwriteconfig5 --file ~/.config/kwinrc --group Windows --key BorderlessMaximizedWindows false
	qdbus org.kde.KWin /KWin reconfigure
