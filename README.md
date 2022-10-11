# Diplomamunka LaTeX template

Overleaf: https://www.overleaf.com/read/fjppbqdcbcys

Ezt érdemes lecopy-zni, vagy innen GitHub-ról letölteni a repo-t *zip*-ben, majd Overleaf-en **New Project -> Upload Project -> Select .zip file.** Ezután bal felső sarokban **Menu -> Main document -> main.tex-re állítani.**

## Használati útmutató

- A **chapters** mappába kell létrehozni a tex fájlokat fejezetenként. Ezeken belülre kerülnek a szövegek, ábrák, stb. A tagolásra a **"subsection"** és a **"subsubsection"** parancsokat kell használni.

- A **main.tex**-be meg kell adni a fejezeteket, a minta szerint, a címüket oda kell beírni, NAGYBETŰVEL. Amennyiben nincsenek ábrák/táblázatok/rövidítések, úgy az annak megfelelő rész kiszedhető onnan.

- Az ábrákat az **img** mappába kell feltölteni.

- A referenciákat a **references.bib**-be kell bemásolni, *bib* formátumban.

- A saját, személyre szabott borítót, feladatlapot, konzultációs naplót, és nyilatkozatot az **includes** mappába kell tenni értelemszerűen elnevezve, *pdf* formátumban. Ezekhez *docx* formátumú sablonok találhatóak a **docx-sablonok** mappában. *(Éredemes a rendes desktop Word-ben kitölteni és pdf-be exportálni, mert az online Word / LibreOffice használata esetén lehet hogy elrontja.)*

- A rövidítéseket az **acronyms.tex**-be lehet megadni, értelemszerűen, a minta szerint.