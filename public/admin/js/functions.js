(function() 
{
	Jobber = {
		
		jobber_admin_url: "",
		
		FixPng: function()
		{
			var arVersion = navigator.appVersion.split("MSIE");
			var version = parseFloat(arVersion[1]);

			if ((version >= 5.5) && (document.body.filters)) 
			{
			   for(var i=0; i<document.images.length; i++)
			   {
			      var img = document.images[i];
			      var imgName = img.src.toUpperCase();

			      if (imgName == this.jobber_admin_url.toUpperCase() + "IMG/BT-RSS.PNG")
			      {
			         var imgID = (img.id) ? "id='" + img.id + "' " : "";
			         var imgClass = (img.className) ? "class='" + img.className + "' " : "";
			         var imgTitle = (img.title) ? "title='" + img.title + "' " : "title='" + img.alt + "' ";
			         var imgStyle = "display:inline-block;" + img.style.cssText;
			         if (img.align == "left") imgStyle = "float:left;" + imgStyle;
			         if (img.align == "right") imgStyle = "float:right;" + imgStyle;
			         if (img.parentElement.href) imgStyle = "cursor:hand;" + imgStyle;
			         var strNewHTML = "<span " + imgID + imgClass + imgTitle;
			         strNewHTML += " style=\"" + "width:" + img.width + "px; height:" + img.height + "px;" + imgStyle + ";";
			         strNewHTML += "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader";
			         strNewHTML += "(src=\'" + img.src + "\', sizingMethod='scale');\"></span>";
			         img.outerHTML = strNewHTML;
			         i = i - 1;
			      }
			   }
			}

		},
		
		DeactivateLink: function(job_id)
		{
			var url = Jobber.jobber_admin_url+'deactivate/';
			Jobber.Deactivate(url, job_id);
		},
		ActivateLink: function(job_id)
		{
			var url = Jobber.jobber_admin_url+'activate/';
			Jobber.Activate(url, job_id, 0);
		},
		Activate: function(url, job_id, is_first_page)
		{
			$.ajax({
			  type: "POST",
			  url: url,
			  data: "job_id=" + job_id,
			  success: function(msg) {
			   	if (msg != "0")
					{
						var currentRowId = 'item'+job_id;
						var currentLinkId = 'activateLink'+job_id;
						if(is_first_page == 1)
						{
							$("#"+currentRowId).css({ display: "none" });
						}
						else
						{
							var deactivateJobFunction = function()
							{
								Jobber.DeactivateLink(job_id);
							};
							
							var linkElement = document.getElementById(currentLinkId);
							linkElement.setAttribute('title', 'deactivate');
							linkElement.setAttribute('onclick', deactivateJobFunction);
							linkElement.onclick = deactivateJobFunction;
							linkElement.innerHTML = '<img src="'+Jobber.jobber_admin_url+'img/icon_deactivate.gif" alt="deactivate" />';
							linkElement.id = 'deactivateLink'+job_id;
						}	
					}
			  }
			});
		},
		
		Deactivate: function(url, job_id)
		{
			$.ajax({
			  type: "POST",
			  url: url,
			  data: "job_id=" + job_id,
			  success: function(msg) {
			   	if (msg != "0")
					{
						var currentLinkId = 'deactivateLink'+job_id;
						
						var activateJobFunction = function()
						{
							Jobber.ActivateLink(job_id);
						};
						
						var linkElement = document.getElementById(currentLinkId);
						linkElement.setAttribute('title', 'activate');
						linkElement.setAttribute('onclick', activateJobFunction);
						linkElement.onclick = activateJobFunction;
						linkElement.innerHTML = '<img src="'+Jobber.jobber_admin_url+'img/icon_accept.gif" alt="activate" />';
						linkElement.id = 'activateLink'+job_id;
					}
			  }
			});
		},
		
		DeactivateSpotlight: function(job_id)
        {
            var url = Jobber.jobber_admin_url+'deactivate-spotlight/';
            Jobber.SpotlightDeactivate(url, job_id);
        },
        ActivateSpotlight: function(job_id)
        {
            var url = Jobber.jobber_admin_url+'activate-spotlight/';
            Jobber.SpotlightActivate(url, job_id, 0);
        },
        SpotlightActivate: function(url, job_id, is_first_page)
        {
            $.ajax({
              type: "POST",
              url: url,
              data: "job_id=" + job_id,
              success: function(msg) {
                   if (msg != "0")
                    {
                        var currentRowId = 'item'+job_id;
                        var currentLinkId = 'activateSpotlight'+job_id;
                        if(is_first_page == 1)
                        {
                            $("#"+currentRowId).css({ display: "none" });
                        }
                        else
                        {
                        	var deactivateSpotlightFunction = function()
							{
								Jobber.DeactivateSpotlight(job_id);
							};
							
							var linkElement = document.getElementById(currentLinkId);
							linkElement.setAttribute('title', 'deactivate-spotlight');
                            linkElement.setAttribute('onclick', deactivateSpotlightFunction);
                            linkElement.onclick = deactivateSpotlightFunction; 
                            linkElement.innerHTML = '<img src="'+Jobber.jobber_admin_url+'img/icon_spotlight_deactivate.gif" alt="deactivate" />';
                            linkElement.id = 'deactivateSpotlight'+job_id;
                        }    
                    }
              }
            });
        },
        
        SpotlightDeactivate: function(url, job_id)
        {
            $.ajax({
              type: "POST",
              url: url,
              data: "job_id=" + job_id,
              success: function(msg) {
                   if (msg != "0")
                    {
                        var currentLinkId = 'deactivateSpotlight'+job_id;
                        var activateSpotlightFunction = function()
						{
							Jobber.ActivateSpotlight(job_id);
						};
						
						var linkElement = document.getElementById(currentLinkId);
						linkElement.setAttribute('title', 'activate-spotlight');							
                        linkElement.setAttribute('onclick', activateSpotlightFunction);
                        linkElement.onclick = activateSpotlightFunction;
                        linkElement.innerHTML = '<img src="'+Jobber.jobber_admin_url+'img/icon_spotlight_activate.gif" alt="activate" />';
                        linkElement.id = 'activateSpotlight'+job_id;
                    }
              }
            });
        },
		
		Delete: function(url, job_id)
		{
			if(confirm(Jobber.I18n.js.delete_job_confirmation_question))
			{
				$.ajax({
				  type: "POST",
				  url: url,
				  data: "job_id=" + job_id,
				  success: function(msg) {
				   	if (msg != "0")
						{
							var currentJobId = 'item'+job_id;
							$("#"+currentJobId).css({ display: "none" });
						}
				  }
				});
			}
			else
				return false;
		}
	}
})();
