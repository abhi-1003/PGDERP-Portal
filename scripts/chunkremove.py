# {files_id:{$in:[ObjectId('6486063797d2f4ca3ed7cac7'), ObjectId('6486067797d2f4ca3ed7cac9')]}}

a = "64b66e9cf9016f70c4f6d3bc,64b69bbff9016f70c4f6d3d3,64b69b2df9016f70c4f6d3cf,64b66eb3f9016f70c4f6d3c1,64b6999cf9016f70c4f6d3c9,64b6b2adf9016f70c4f6d3ea,64b6a7c0f9016f70c4f6d3e2,64b6b294f9016f70c4f6d3e6"

start = "{files_id:{$in:["
end = "]}}"

l = a.split(",")

for c in l:
    start += "ObjectId('" 
    start += c
    start += "'),"

start += end
print(start)