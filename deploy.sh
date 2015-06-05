bucketUrl='s3://mortgageclub.quangthai.be'

s3cmd del $bucketUrl --recursive --force
s3cmd -P put --recursive build/* $bucketUrl
