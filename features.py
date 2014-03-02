import math
from scipy.integrate import simps

def get_features(lines):
	current_rep = 1
	x_sum = 0
	y_sum = 0
	z_sum = 0
	x_array = []
	y_array = []
	z_array = []
	time_array = []
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
			x_sum = 0
			y_sum = 0
			z_sum = 0
			x_array = []
			y_array = []
			z_array = []
			time_array = []
	return RMS, x_integral, y_integral, z_integral