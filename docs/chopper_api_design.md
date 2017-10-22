## TYPE
- String: `"string"`
- Integer: `10`
- Float: `10.0`
- Boolean: `true`
- Date: `"2015-08-01T06:21:01.804Z"`
- Array: `[]`
- Object: `{}`

## CODE
- `200 OK` - OK
- `201 Created` - POST 创建的内容创建成功
- `204 No Content` - 没有返回的内容
- `304 Not Modified` - Used when HTTP caching headers are in play
- `400 Bad Request` - 请求的参数错误（比如参数名无效，参数的格式错误）
- `401 Unauthorized` - 没有认证请求需要权限的API，提示其需要登录
- `403 Forbidden` - 已经登录，请求了他没有权限请求的的资源
- `404 Not Found` - 请求的资源不存在
- `405 Method Not Allowed` - When an HTTP method is being requested that isn't allowed for the authenticated user
- `410 Gone` - Indicates that the resource at this end point is no longer available. Useful as a blanket response for old API versions
- `415 Unsupported Media Type` - If incorrect content type was provided as part of the request
- `422 Unprocessable Entity` - Used for validation errors
- `429 Too Many Requests` - When a request is rejected due to rate limiting

## API DESIGN
### `basicData`
#### GET
##### `/user`
- desc: 获得指定时间区间，指定地区的下属一级地区的用户数据
- params:
	- `start`: Date 开始时间
	- `end`: Date 结束时间，如果和开始时间相同则获得当天数据
	- `parentDistrictId`: Integer(?) 父地区id，如果不存在则返回用户管理的下属地区。如果有则返回父区域下一级的区域的统计数据。
- return:注意统计数据的粒度为天为单位，如果区间大于一天则返回区间内所有天数据的数组。如果只有一天也返回数组。最小单位为`building楼栋`
		
		[{district，data:[{userData}]}]

- example:
	
		user：市场总监
		request：GET userData?start=2015-08-27T14:31:08.902Z&end=2015-08-27T14:31:08.902Z
		return：［{“id“: 12, “name”:“华东”, .... data:[{date:2015-08-27T14:31:08.902Z, ....}]}］
		

##### `/nightCatStore`
- desc: 获得指定时间区间，指定地区的下属一级地区的夜猫店数据
- params:
	- `start`: Date 开始时间
	- `end`: Date 结束时间，如果和开始时间相同则获得当天数据
	- `parentDistrictId`: Integer(?) 父地区id，如果不存在则返回用户管理的下属地区。如果有则返回父区域下一级的区域的统计数据。
- return: 注意统计数据的粒度为天为单位，如果区间大于一天则返回区间内所有天数据的数组。如果只有一天也返回数组。最小单位为`section学校`
		
		[{district，data:[{nightCatData}]}]
		
- example:

		user：城市经理
		request：GET userData?start=2015-08-27T14:31:08.902Z&end=2015-08-27T14:31:08.902Z&parentDistrictId＝上海
		return：［{“id“: 122123, “name”:“闵行”, .... data:[{date:2015-08-27T14:31:08.902Z, ....}]}］
		
### `miniSupplierData`
#### GET
##### `/miniSupplier/sum`
- desc: 获得指定时间区间，指定地区下属一级或者用户管理地区的微仓数据（统计区域下所有微仓数据的和）
- params:
	- `start`: Date 开始时间
	- `end`: Date 结束时间，如果和开始时间相同则获得当天数据
	- `parentDistrictId`: Integer(?) 父地区id，如果不存在则返回用户管理的下属地区。如果有则返回父区域下一级的区域的统计数据
- return: 注意统计数据的粒度为天为单位，如果区间大于一天则返回区间内所有天数据的数组。如果只有一天也返回数组。最小单位为`city城市`
		
		[{districtMiniSupplierData}]	

##### `/miniSupplier/list`
- desc: 获得指定时间区间，指定地区下属一级或者用户管理地区的微仓数据（逐条列出微仓）
- params:
	- `start`: Date 开始时间
	- `end`: Date 结束时间，如果和开始时间相同则获得当天数据
	- `districtId`: Integer(?) 父地区id，返回父区域下的微仓统计数据
- return:
 
		[{miniSupplierData}]
		
##### `/nightCatStore`
- desc: 获得夜猫店的数据
- params:
    - `page`: Integer 分页
	- `cityId`: Integer(?)可选，过滤出指定城市中的夜猫店
	- `miniSupplierId`: Integer(?)可选，过滤出指定微仓供货的夜猫店
	- `sectionId`: Integer(?)可选，过滤出学校中的夜猫店
- return：

		[{nightCatStore}]

### `KPIData`
#### GET
##### `/`
- desc: 获得统一级别的KPI数据
- params:
	- `parentDistrictId`: Integer(?)父地区id，如果不存在则返回用户管理的下属地区。如果有则返回父区域下一级的区域的统计数据。＊注意：该参数只能为自己下属的地区。否则返回403
- code: 
	- 403
	- 200
- return: 注意统计数据的粒度为天为单位，如果区间大于一天则返回区间内所有天数据的数组。如果只有一天也返回数组。最小单位为`city城市`
		
		[{KPIdata}]
		
### `TrackData`
#### GET
##### `/`
- desc: 临时track数据
- params: 
	- 无入参
- code:
	- 403
	- 200
- retrun: 表格数据
	- {"success": true, data1:[{...}], data2:[{...}], data3:[{...}]}
	- {"success": false, data:{error:"...", code: 401}}