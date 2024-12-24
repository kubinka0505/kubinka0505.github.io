@echo off

: Get project path :
set CWD=%cd%
for %%I in (.) do (
	set Project=%%~nxI
)
cd %Project%

:-=-=-=-=-=-:

: Set system variables :
set Windows=C:\Windows\System32

title Uploading "%Project%" to GitHub...
cls

:-=-=-=-=-=-:

: Variables :

: - In seconds -
set "TimeOut=8"
: - Enable custom commit date -
set "CommitDate=False"
: - `pause` instead of `exit` -
set "ViewResult=False"
: - Your GitHub username -
set "UserName=kubinka0505"
: - Use repository named "test" -
set "TestRepo=False"

::: --- Colors --- :::
::: Format:
::: [38;2;(R_Decimal);(G_Decimal);(B_Decimal)m
set COLOR_OK=[38;2;0;204;0m
set COLOR_Info=[38;2;68;170;255m
set COLOR_Meta_Info=[38;2;187;85;255m
set COLOR_Warning=[38;2;255;204;0m
set COLOR_Error=[38;2;204;17;0m
set COLOR_Reset=[39m

::: --- Commit Date --- :::
::: Until future, commit date string is "now"
::: -=-=-=-=-=-
::: Minimum: "01 January 1970 00:00:00" :::
::: Maximum: "31 December 2099 23:59:59" :::
set CommitDate_Value="2022-07-10T10:07:29Z"

::: --- Date --- :::
for /F "tokens=2" %%d in ('date /t') do (
	set Date=%%d
)

::: ---Version --- :::
set Version=1.0

: Commit Message :
:: set Commit=Release `%Version%`
set Commit=Release `%Date%`

:-=-=-=-=-=-:

: Files Removal :
if exist .git (
	attrib -H .git
	rd /s /q .git
	:-=-=-=-:
	echo %COLOR_Reset%
	echo Removed ".git"
	echo.
	echo -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
)

echo %COLOR_Meta_Info%
git init & git add * > %Windows%\..\nul

echo. & git rm --cached ".config" -r -f
:: Games guides
echo. & git rm --cached "games/guides/speedrun" -r -f
:: Classic Music
echo. & git rm --cached "music_classic" -r -f
echo. & git rm --cached "music-classic" -r -f
::Texts
echo. & git rm --cached "texts" -r -f
echo. & git rm --cached "*/texts.*" -r -f
:: Other
echo. & git rm --cached "other/fumo*" -r -f
echo. & git rm --cached "other/test" -r -f
echo. & git rm --cached "other/assets/media/txt" -r -f
echo. & git rm --cached "assets/media/img/svg/logoNoPub" -r -f
echo. & git rm --cached "music/resources/assets/files/samples" -r -f
echo. & git rm --cached "assets/media/img/png/Banners/BannerFullHD_Alt.png"
:: ---
:: Add
echo. & git add "texts/Reviews/Movies/2023-Mastersu15-MurkoffTactical"

:-=-=-=-=-=-:

echo.
: Commit Date setup :
set CD_Prefix= not
set CD_Suffix=
set CD_COLOR=%COLOR_OK%
set CD_VALUE=%CommitDate_Value%

if not %CommitDate%==False (
	set CD_Prefix=
	set CD_Suffix= (%CD_Value%^)
	set CD_Color=%COLOR_Error%
	:-=-=-=-=-=-:
	set GIT_AUTHOR_DATE=%CD_VALUE%
	set GIT_COMMITTER_DATE=%CD_VALUE%
)

echo.
echo %COLOR_Reset% -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

:-=-=-=-=-=-:

if %TestRepo%==True (
	set Project=test
)

: Pushing Commit :
echo. %COLOR_Warning%
git commit -m "%Commit%"
git remote add origin https://github.com/%UserName%/%Project%
git remote -v
echo. %COLOR_Reset%

echo -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
echo.
echo %COLOR_Info%Commit message:		%Commit%
echo Repository:		https://github.com/%UserName%/%Project%%COLOR_Reset%
echo %CD_Color%Commit date%CD_Prefix% set.%CD_Suffix%%COLOR_Reset%
TimeOut %TimeOut% /NOBREAK
echo.
echo -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

echo.
git push -f origin master
echo.
echo -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
echo.

if exist .git (
	attrib -H .git
	rd /s /q .git
	:-=-=-=-:
	echo Removed ".git"
)

:-=-=-=-=-=-:

: BEL and Output :
%Windows%\RunDLL32.exe %Windows%\User32.dll,MessageBeep

cd %CWD%

if not %ViewResult%==False (
	echo. & %Windows%\..\explorer.exe https://github.com/%UserName%/%Project%
	pause
)