Automatically load the different pages of the Miles and More Kartenabrechnung and copy the content to the clipboard so it can easily be pasted into Excel

In the past the Miles and More Credit Card offered to download CSV files of the transactions. This is not longer available. 

This script walks through the different pages of the online transation overview, copies the content into the cut & paste buffer for easy insertion into Excel

Requirements:
1. Browser with installed *monkey extension (Greasemonkey, Tampermonkey, ...)
2. This user-script provided here loaded into the *monkey extension
3. Miles More Kreditkarten Abrechnung Konto und Zugang

Usage
1. Einloggen bei MM unter https://www.miles-and-more.kartenabrechnung.de/mam/Home/content/FinancialStatus.xhtml (gffls. mit F12 die Console in den DevTools öffnen, um den Fortschritt zu beobachten)
2. Auf "alle Umsätze" clicken
3. Abwarten bis das Skript alle aktuellen Umsätze gesammelt hat und in das Clipboard geschrieben hat

4a. In Excel (in einem neuen Sheet) die Umsätze pasten (das Skript geht davon aus, dass das Komma das Dezimal-Trennzeichen ist)

4b. Einen anderen Zeitraum wählen und auf "Umsätze zeigen" clicken -> 3.
