# Copyright (c) 2024, Power Soft and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class SalesInvoice(Document):
	# pass


	def after_insert(self):

		# create a new document in customer ledger
		doc = frappe.get_doc({
			'doctype': 'Customer Ledger',
			'date': self.date,
			'transaction_type': 'Invoice Receivable',
			'reference': self.name,
			'customer': self.customer_name,
			'debit': self.net_amount,
			'credit': 0,
		})
		doc.insert()
	
	def on_update(self):
	
		#get customer ledger entry related to this invoice
		doc = frappe.get_last_doc('Customer Ledger', filters={
    		'transaction_type' : 'Invoice Receivable',
    		'reference' : self.name,
		})
		doc.date = self.date
		doc.customer = self.customer_name
		doc.debit = self.net_amount
		doc.save()

