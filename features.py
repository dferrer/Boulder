with open('data.csv', 'rU') as csvfile:
	reader = csv.reader(csvfile)
	for line in reader:
		x = line[0]
		y = line[1]
		z = line[2]
		time = line[3]
		repnumber = line[4]