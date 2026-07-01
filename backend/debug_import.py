import os
import sys
import uvicorn

print('cwd', os.getcwd())
print('sys.path', sys.path[:5])
print('uvicorn', uvicorn.__file__)
import app
print('app imported')
