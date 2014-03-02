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

b, a = scipy.signal.butter(4, 1, 'lowpass')
output_signal_low = scipy.signal.filtfilt(b, a, current_window)

d, c = scipy.signal.butter(4, 1, 'highpass')
output_signal_low = scipy.signal.filtfilt(d, c, current_window)
