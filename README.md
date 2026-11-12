# A Discord Birthday Reminder Bot

This bot will @ the user in a chosen channel to any birthdays today or the following day from the birthday.json database.

> NOTE: Do not make your .env data public! :D

To set up automatic run of the script on PC startup and sleep wakeup do the following:

Create a windows shortcut inside your windows shell:startup folder location.

> Windows key + R -> type shell:startup -> Right click inside folder and create a new shortcut -> Enter the following command that points to the location of the script file (cmd.exe /k "cd /d C:\path\to\your\Discord-Bot && node index.js") -> Click next and name, and finish

Now go to your task scheduler to enable this script to run from sleep wakeup (as I tend to leave my compter in sleep) by using the windows key and typing "task scheduler"

Right click the "Task Scheduler Library" folder and click create folder (for organisation purposes)
Right click the new folder and click create task
Name it whatever you want

Under the triggers tab:
> Click add -> Change begin the task to "on an event" -> change log: to "system" -> Source to "Power-troubleshooter" -> Event ID: to "1" -> Down below enable delay task and set to 15 seconds (This will wait for your PC to gain internet access on sleep wakeup)

Under the actions tab:
> Click add -> Action: to "start a program" -> program/script: enter "node" -> Add arguments: enter "index.js" -> Start in: enter location of root folder

Under conditions tab:
> Untick "Start the task only if compter is on AC power"
