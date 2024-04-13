# Diplomamunka LaTeX template

Overleaf: https://www.overleaf.com/read/fjppbqdcbcys

## Setup
- Projekt létrehozása:
    - Overleaf-en belül megnyitás után a **copy**-ra kattintva lemásolni (ahol az összes projekt látható, jobb oldalt van a gomb),
  *vagy:*
  - innen GitHub-ról letölteni a repo-t *zip*-ben, majd Overleaf-en **New Project -> Upload Project -> Select .zip file.**
- **FONTOS!** A projekt első megnyitásakor bal felső sarokban **Menu -> Main document -> main.tex-re kell állítani.** Különben nem fog lefordulni, hibát fog írni. Továbbá fontos, hogy a szerkesztőben **NE** a "**template.tex**" legyen kiválasztva (bármelyik másik amit épp szerkesztünk jó).
- Ezek után ha minden jól ment lefordul a projekt, és jobb oldalt megjelenik a generált pdf.

## Használat
- A sablon eredetileg példa tartalommal van feltöltve, ez használható kiindulási alapnak, vagy kitörölhető.

- A **chapters** mappába kell létrehozni a tex fájlokat fejezetenként. Ezeken belülre kerülnek a szövegek, ábrák, stb. A tagolásra a **"subsection"** és a **"subsubsection"** parancsokat kell használni.

- A **main.tex**-be meg kell adni a fejezeteket, a minta szerint, a címüket oda kell beírni, NAGYBETŰVEL. Amennyiben nincsenek ábrák/táblázatok/rövidítések, úgy az annak megfelelő rész kiszedhető onnan.

- Az ábrákat az **img** mappába kell feltölteni.

- A referenciákat a **references.bib**-be kell bemásolni, *bib* formátumban.

- A saját, személyre szabott borítót, feladatlapot, konzultációs naplót, és nyilatkozatot az **includes** mappába kell tenni értelemszerűen elnevezve, *pdf* formátumban, a kapott Word sablonokból kiexportálva (példaként az üres sablonok vannak a projektben).

- A rövidítéseket az **acronyms.tex**-be lehet megadni, értelemszerűen, a minta szerint.
