import re

regexp = re.compile('^index\.js: \{\"x\":(.*),\"y\":(.*),\"z\":(.*),\"vibe\".*\"time\":(.*)\}0$')
with open('data/barbell.training_data') as f:
	contents = f.read().splitlines()[25:-50]
	xs = []
	ys = []
	zs = []
	for line in contents:
		if line.strip() != 'index.js:  JS: Simply.js:' and line.strip() != '' and line[0] != '[':
			m = re.search(regexp, line)
			xs.append(m.group(1) + '\t' + m.group(4))
			ys.append(m.group(2) + '\t' + m.group(4))
			zs.append(m.group(3) + '\t' + m.group(4))
	for x in xs:
		print x
	print ''
	for y in ys:
		print y
	print ''
	for z in zs:
		print z