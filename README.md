# GetAllReposHash
Get all the hashes of GIT repos inside a folder. Usefull when you have a project with dependencies in several GIT repos and you want to build a stable environment based on the latest stable commits.

The idea is get a file with all the git instructions to recover all the revisions of the folders in the folder you are executing the script

# Example
Let's say you have a project with a server and a frontend inside your project folder.

projectFolder
- Client
- Server

The client belong to a GIT repository and the server belong to another GIT repository. In order to test the Client, you need to run the server.
BUT somebody create an update in the Server repo, and it is no loger compatible with your Client folder or biceversa. So, when you recober the latest versions of Client and Server repos, your app does not work.

So, in order to avoid this, you can run this script, which will build a file with all the commands needed to get all the repos with the exact commit you know the server runs, you execute it and boila! your development environment is working again!
