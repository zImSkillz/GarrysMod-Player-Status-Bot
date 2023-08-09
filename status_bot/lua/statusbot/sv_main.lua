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

if SERVER then
	RunConsoleCommand("sv_hibernate_think", "1")

	local function getAdmins()
		return 0
	end

	local function update()
		--print("updateing status..")
		
		local adminCount = getAdmins()

		http.Post("http://" .. Config.ApiIp .. ":" .. Config.ApiPort .. "/update?authcode=" .. Config.AuthCode .. "&players=" .. player.GetCount() .. "&maxplayers=" .. game.MaxPlayers() .. "&admins=" .. adminCount .. "&map=" .. game.GetMap())
	end

	timer.Remove("statusbot-refresher")

	timer.Create("statusbot-refresher", 5, 0, function()
		update()
	end)
	
	timer.Start("statusbot-refresher")
			
	print(" ")
	print("---------------------------")
	print("Successfully Loaded Status Bot")
	print("Bot by zImSkillz")
	print("Made with Love <3")
	print("---------------------------")
	print(" ")
end
