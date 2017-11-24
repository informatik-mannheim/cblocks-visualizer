$mongo_dir = 'C:\Program Files\MongoDB\Server\3.4\bin'
$registry_dir = '~\Documents\GitHub\cblocks-registry'
$cblocks_dir = '~\Documents\GitHub\cblocks'

$MongoBlock = {
  Set-Location $args[0]
  .\mongod.exe
}

$RegistryBlock = {
  Set-Location $args[0]
  npm start
}

$CBlocksBlock = {
  Set-Location $args[0]
  npm start
}

Get-Job|Stop-Job
Get-Job|Remove-Job

$j1 = Start-Job $MongoBlock -Name "MongoDBJob"-ArgumentList $mongo_dir
$j2 = Start-Job $RegistryBlock -Name "cBlocksRegistryJob" -ArgumentList $registry_dir
$j3 = Start-Job $CBlocksBlock -Name "cBlocksUIJob" -ArgumentList $cblocks_dir

Get-Job
