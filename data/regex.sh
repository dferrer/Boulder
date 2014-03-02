for x in *.training_data
do
	python regex.py $x > $x.training_result
done
