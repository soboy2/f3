pyvenv f3
cd f3
source bin/activate


var yearlyBubbleChart = dc.bubbleChart('#yearly-bubble-chart');


You should:

Install Python 3 and virtualenv: apt-get install -y python3 python-virtualenv
Create a Python 3 virtualenv: virtualenv -p $(which python3) testDir
Activate the virtual environment with source testDir/bin/activate
