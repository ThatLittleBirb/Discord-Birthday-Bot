# A Discord Birthday Reminder Bot

I have ADHD and even when friends and families birthdays are in my calendar I still forget...

This is why I created a bot to alert me on discord, a platform I use daily (cus im a degenerate).

This is a lightweight bot that pings the user in a chosen channel to alert of any birthdays that are happening on the present day or the next.

It is by any means totally improvable, I've used my sparce knowledge of JS, JSX, Python, and React to create this bot.

> **NOTE:** Do not make your .env data public, and remove .example from any file names! :D

To set up automation of the script on PC start-up, and also sleep wakeup follow the steps below:

**PC Startup:**

Create a windows shortcut inside your windows shell:startup folder location.

> Windows key + R -> type shell:startup -> Right click inside folder and create a new shortcut -> Enter the following command that points to the location of the script file (cmd.exe /k "cd /d C:\path\to\your\Discord-Bot && node index.js") -> Click next and name, and finish

**Sleep wakeup:**

Go to your task scheduler to enable this script to run from sleep wakeup (as I tend to leave my computer in sleep rather than shutdown) by using the windows key and typing "task scheduler"

Right click the "Task Scheduler Library" folder and click create folder (for organisation purposes)
Right click the new folder and click create task, name it whatever you want

**Under the triggers tab:**
> Click add -> Change begin the task to "on an event" -> change log: to "system" -> Source to "Power-troubleshooter" -> Event ID: to "1" -> Down below enable delay task and set to 15 seconds (This will wait for your PC to gain internet access on sleep wakeup)

**Under the actions tab:**
> Click add -> Action: to "start a program" -> program/script: enter "node" -> Add arguments: enter "index.js" -> Start in: enter location of root folder

**Under conditions tab:**
> Untick "Start the task only if compter is on AC power"
