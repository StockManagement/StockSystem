Category
	• Id
	• Name
	• ParentId *


BarcodeType
	• Id
	• Name


Package
	• Id
	• Name
	• ItemId *
	• Quantity
	• (3elbe kbire fiha 3elab)

(cost - price)


Item
	• Id
	• Code (nvarchar)
	• Description
	• BrandId * 
	• CatId *
	• Name
	• TypeId * (ex: liquide, solid, gaz, …)
	• MakeId * (ex: made in china)
	• ItemSizeId *

	• Picture
	• CatalogPath (eza bado ya3mel catalog: kif brakeb ot3a kahrabe2iye masalan)
	• Barcode (to check if all barcode types has the same charset&type, if not create a table for barcode)
	• BarcodeTypeId
	• Color (comma separated hexadecimal)
	
	• CreatedBy*
	• UpdatedBy*
	• DeletedBy*
	• CreatedDate
	• UpdatedDate
	• DeletedDate

	• IsDeleted
	• QuantityInCurrentStock (trigger)

	• Vat
	• ApplyVat
	• areaId * (wen 7atina be salet l 3ared)

(cost - price)


ItemSize
	• Id
	• Height (ارتفاع)
	• HeightUnitId
	• Length (طول)
	• LengthUnitId
	• Width (عرض)
	• WidthUnitId
	• Weight


Stock
	• Id
	• ItemId *
	• BranchId *

	• MinPrice
	• MidPrice
	• MaxPrice
	• UnitCost
	• AverageUnitCost


Offre
	• Id
	• Code
	• Description
	• From
	• To


OffreRequirement
	• Id
	• ItemId *
	• Quantity
	• UnitId *
	• OffreId


OffreResult
	• Id
	• ItemId *
	• Quantity
	• UnitId *
	• OffreId


Transaction
	• Id
	• Number
	• Description
	• AccountId (seller or purchaser)
	• BranchId *
	• Date
	• CreatedDate
	• UpdatedDate
	• CreatedBy
	• UpdatedBy
	• InOut


TransactionDetails
	• Id
	• ItemId *
	• ProductionDate (تاريخ الصنع)
	• ExpiryDate
	• BranchId *
	• InOut

