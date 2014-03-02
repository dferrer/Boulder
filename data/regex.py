import re, sys
filename = sys.argv[1]

regexp = re.compile('^index\.js: \{\"x\":(.*),\"y\":(.*),\"z\":(.*),\"vibe\".*\"time\":(.*)\}0$')
with open(filename) as f:
	contents = f.read().splitlines()[25:-50]
	# output = []
	xs = []
	ys = []
	zs = []
	for line in contents:
		if line.strip() != 'index.js:  JS: Simply.js:' and line.strip() != '' and line[0] != '[':
			m = re.search(regexp, line)
			# output.append(m.group(1) + ' ' + m.group(2) + ' ' + m.group(3) + ' ' + m.group(4))
			xs.append(m.group(1) + '\t' + m.group(4))
			ys.append(m.group(2) + '\t' + m.group(4))
			zs.append(m.group(3) + '\t' + m.group(4))
	# for elem in output:
	# 	print elem
	for x in xs:
		print x
	print ''
	for y in ys:
		print y
	print ''
	for z in zs:
		print z