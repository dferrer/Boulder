for x in data/*.training_data
do
	python regex.py $x > $x.training_result
done
