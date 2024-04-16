// Copyright (c) 2024, Power Soft and contributors
// For license information, please see license.txt

frappe.ui.form.on("Sales Invoice", {
	// refresh(frm) {

	// },


});

frappe.ui.form.on("Invoice Items", {
	// refresh(frm) {
	// },

    item_name(frm, cdt, cdn)
	{
		// frappe.msgprint('Item name has been selected.');
		let row = frappe.get_doc(cdt, cdn);
		//console.log(row.item_name);
		frappe.call({
			method: "frappe.client.get",
			args: {
				doctype: "Item",
				name: row.item_name,
			},
			callback(i) {
				//console.log(i);
				
			}
		});
	},

	// calculate value on change of qty
	box_quantity(frm, cdt, cdn)
	{		
		calculate(frm, cdt, cdn);
	},

	// calculate value on change of rate
	rate(frm, cdt, cdn)
	{		
		calculate(frm, cdt, cdn);
	}
});

//calculation for total amount
function calculate(frm, cdt, cdn)
{
	var qty = frappe.model.get_value(cdt, cdn, 'box_quantity');
	var rate = frappe.model.get_value(cdt, cdn, 'rate');
	
	frappe.model.set_value(cdt, cdn, 'amount', parseFloat((qty*rate)));

}
