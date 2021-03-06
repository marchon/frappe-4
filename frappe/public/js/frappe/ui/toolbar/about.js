frappe.provide('frappe.ui.misc');
frappe.ui.misc.about = function() {
    if (!frappe.ui.misc.about_dialog) {
        var d = new frappe.ui.Dialog({ title: __('Frappe Framework') })

        $(d.body).html(repl("<div>\
		<p>" + __("Open Source Applications for the Web") + "</p>  \
		<p><i class='fa fa-globe fa-fw'></i>\
			 Website: <a href='https://frappe.io' target='_blank'>https://frappe.io</a></p>\
	 	<p><i class='fa fa-github fa-fw'></i>\
			Source: <a href='https://github.com/sabbir360' target='_blank'>https://github.com/sabbir360</a></p>\
		<hr>\
		<h4>Installed Apps</h4>\
		<div id='about-app-versions'>Loading versions...</div>\
		<hr>\
		<p class='text-muted'>&copy; 2016 Frappe Technologies Pvt. Ltd and contributors </p> \
		</div>", frappe.app));

        frappe.ui.misc.about_dialog = d;

        frappe.ui.misc.about_dialog.on_page_show = function() {
            if (!frappe.versions) {
                frappe.call({
                    method: "frappe.utils.change_log.get_versions",
                    callback: function(r) {
                        show_versions(r.message);
                    }
                })
            }
        };

        var show_versions = function(versions) {
            var $wrap = $("#about-app-versions").empty();
            $.each(keys(versions).sort(), function(i, key) {
                var v = versions[key];
                $($.format('<p><b>{0}:</b> v{1}<br></p>', [v.title, v.version])).appendTo($wrap);
            });

            frappe.versions = versions;
        }

    }

    frappe.ui.misc.about_dialog.show();

}