import math, numpy, csv
from scipy.integrate import simps
import scipy.signal
from scikits.learn import svm

current_window, next_window = [], []

def push(data):
	if len(current_window) < 256:
		current_window.append(data)
	else:
		next_window.append(data)
		if len(next_window) == 128:
			current_window = current_window[128:] + next_window

def get_features(lines):
	current_rep = 1
	x_sum, y_sum, z_sum = 0, 0, 0
	x_max, y_max, z_max = -100000, -100000, -100000
	x_array, y_array, z_array, time_array, features = [], [], [], [], []
	for line in lines:
		x_sum += int(line[0])
		y_sum += int(line[1])
		z_sum += int(line[2])
		x_array.append(int(line[0]))
		y_array.append(int(line[1]))
		z_array.append(int(line[2]))
		if line[0] > x_max:
			x_max = line[0]
		if line[1] > y_max:
			y_max = line[1]
		if line[2] > z_max:
			z_max = line[2]
		time_array.append(int(line[3]))
		if current_rep != int(line[4]):
			current_rep = int(line[4])
			RMS = math.sqrt(x_sum * x_sum + y_sum * y_sum + z_sum * z_sum)
			# x_integral = simps(x_array, time_array)
			# y_integral = simps(y_array, time_array)
			# z_integral = simps(z_array, time_array)
			x_average = x_sum / len(x_array)
			y_average = y_sum / len(y_array)
			z_average = z_sum / len(z_array)
			x_std = numpy.std(x_array)
			y_std = numpy.std(y_array)
			z_std = numpy.std(z_array)
			feature = (RMS, x_max, y_max, z_max, x_average, y_average, z_average, x_std, y_std, z_std)
			# feature = (RMS, x_integral, y_integral, z_integral, x_average, y_average, z_average, x_std, y_std, z_std)
			features.append(feature)
			x_sum, y_sum, z_sum = 0, 0, 0
			x_max, y_max, z_max = -100000, -100000, -100000
			x_array, y_array, z_array, time_array = [], [], [], []
	return features

features = []
clf = svm.LinearSVC()
with open('dumbbell.csv', 'rU') as csvfile:
	reader = csv.reader(csvfile)
	features += get_features(reader)
	
with open('shoulder.csv', 'rU') as csvfile:
	reader = csv.reader(csvfile)
	features += get_features(reader)

clf.fit(features, [0,0,0,0,0,0,0,0,1,1,1,1,1,1])

if __name__ == "__main__":
	with open('data/barbell.training_data.training_result') as f:
		contents = f.read().splitlines()
		inpt = []
		for line in contents:
			inpt.append(line.split(' '))
		get_features(inpt)

# b, a = scipy.signal.butter(4, 1, 'lowpass')
# output_signal_low = scipy.signal.filtfilt(b, a, current_window)

# d, c = scipy.signal.butter(4, 1, 'highpass')
# output_signal_low = scipy.signal.filtfilt(d, c, current_window)