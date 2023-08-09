--[[
███████╗██╗███╗   ███╗███████╗██╗  ██╗██╗██╗     ██╗     ███████╗
╚══███╔╝██║████╗ ████║██╔════╝██║ ██╔╝██║██║     ██║     ╚══███╔╝
  ███╔╝ ██║██╔████╔██║███████╗█████╔╝ ██║██║     ██║       ███╔╝ 
 ███╔╝  ██║██║╚██╔╝██║╚════██║██╔═██╗ ██║██║     ██║      ███╔╝  
███████╗██║██║ ╚═╝ ██║███████║██║  ██╗██║███████╗███████╗███████╗
╚══════╝╚═╝╚═╝     ╚═╝╚══════╝╚═╝  ╚═╝╚═╝╚══════╝╚══════╝╚══════╝
				GMod Status Bot Created by
				    zImskillz
						Made with Love <3
]]--

Config = {}

Config.ApiIp = "" -- Do not use 127.0.0.1 or localhost instead use your server ip!

Config.ApiPort = 4124

if SERVER then
	-- The auth code must not contain any symbols or other special characters!
	Config.AuthCode = ""-- WARNING: Keep it Private!
	-- The auth code must not contain any symbols or other special characters!
	
	include("statusbot/sv_main.lua")
end