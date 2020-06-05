# import csv
# with open('buildings.csv') as csv_file:
#     csv_reader = csv.reader(csv_file, delimiter=',')
#     print("[", end="")
#     for row in csv_reader:
#         print("{", end="")
#         print("abbr:\"" + row[0] + "\",", end="")
#         print("id:" + row[1] + ",", end="")
#         print("name:\"" + row[2] + "\",", end="")
#         print("site:\"" + row[3] + "\",", end="")
#         print("use:\"" + row[4] + "\",", end="")
#         print("status:\"" + row[5] + "\",", end="")
#         print("address_1:\"" + row[6] + "\",", end="")
#         print("address_2:\"" + row[7] + "\",", end="")
#         print("owned:\"" + row[8] + "\",", end="")
#         print("type:\"" + row[9] + "\",", end="")
#         print("coordinate:\"" + row[10] + "\",", end="")
#         print("latitude:" + row[11] + ",", end="")
#         print("longitude:" + row[12] + ",", end="")
#         print("},", end="")
#     print("]", end="")

import csv
with open('buildings.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    ret = []
    for row in csv_reader:
        if row[4] in ret:
            continue
        else:
            ret.append(row[4])

print(ret)