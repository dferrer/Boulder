import math
from scipy.integrate import simps
import scipy.signal

# Window

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
	x_array, y_array, z_array, time_array, features = [], [], [], [], []
	for line in lines:
		x_sum += line[0]
		y_sum += line[1]
		z_sum += line[2]
		time_array.append(line[3])
		if current_rep != line[4]:
			current_rep = line[4]
			RMS = math.sqrt(x_sum * x_sum + y_sum * y_sum + z_sum * z_sum)
			x_integral = integrate.simps(x_array, time_array)
			y_integral = integrate.simps(y_array, time_array)
			z_integral = integrate.simps(z_array, time_array)
			feature = (RMS, x_integral, y_integral, z_integral)
			features.append(feature)
			x_sum, y_sum, z_sum = 0, 0, 0
			x_array, y_array, z_array, time_array = [], [], [], []
	return features

b, a = scipy.signal.butter(4, 1, 'lowpass')
output_signal_low = scipy.signal.filtfilt(b, a, current_window)

d, c = scipy.signal.butter(4, 1, 'highpass')
output_signal_low = scipy.signal.filtfilt(d, c, current_window)
