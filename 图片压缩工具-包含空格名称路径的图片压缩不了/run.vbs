Function BrowseForFile()
    Dim shell : Set shell = CreateObject("Shell.Application")
    Dim file : Set file = shell.BrowseForFolder(0, "Choose a file:", &H4000, "")
    BrowseForFile = file.self.Path
End Function
set ws=createobject("wscript.shell")
Dim cmd
cmd = "cmd.bat "&BrowseForFile
ws.run cmd