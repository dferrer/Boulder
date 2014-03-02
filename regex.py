import re

regexp = re.compile('^index\.js: \{\"x\":(.*),\"y\":(.*),\"z\":(.*),\"vibe\".*\"time\":(.*)\}0$')
with open('data/barbell.training_data') as f:
	contents = f.read().splitlines()
	for line in contents:
		if line.strip() != 'index.js:  JS: Simply.js:' and line.strip() != '' and line[0] != '[':
			m = re.search(regexp, line)
			print m.group(1), m.group(2), m.group(3), m.group(4)