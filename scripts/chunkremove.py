# {files_id:{$in:[ObjectId('6486063797d2f4ca3ed7cac7'), ObjectId('6486067797d2f4ca3ed7cac9')]}}

a = "64a18808d4b4d816cf47ce72,64a1881ad4b4d816cf47ce75,64a18842d4b4d816cf47ce7e,64a18822d4b4d816cf47ce78,64a1882cd4b4d816cf47ce7b,64a1884cd4b4d816cf47ce80,64a1885ad4b4d816cf47ce83,64a18a20d4b4d816cf47ce8b,64a18870d4b4d816cf47ce85,64a188a0d4b4d816cf47ce88,64a18a2ad4b4d816cf47ce8d,"

start = "{files_id:{$in:["
end = "]}}"

l = a.split(",")

for c in l:
    start += "ObjectId('" 
    start += c
    start += "'),"

start += end
print(start)