import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-form-create-order',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  providers:[HttpClientModule],
  templateUrl: './form-create-order.component.html',
  styleUrl: './form-create-order.component.css'
})
export class FormCreateOrderComponent implements OnInit {
  productsToSee: Product[] = [];
  productSelected: Product | undefined = undefined;
  totalPrice: number = 0;
  productsSelected: Product[] = []
 
  
  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    productos: new FormArray([])
  });

  constructor(private productService: ProductService, private orderService: OrderService) {
    this.form.get('productos')?.valueChanges.subscribe(() => {
      this.calculatePrice();
    })
  
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe({
      next: (products: Product[]) => {
        this.productsToSee = products;
      },
      error(err: any) {
        console.log(err);
      }
    });
  }

  // Validador personalizado para productos duplicados
  duplicateProductValidator(): (control: AbstractControl) => null | object {
    return (control: AbstractControl): null | object => {
      if (!control.value) return null;
      
      const currentId = control.value;
      const productos = this.productosArray.controls;
      
      // Verificar si hay otro FormGroup con el mismo ID
      const isDuplicate = productos.some((productGroup) => {
        const groupId = productGroup.get('id')?.value;
        return groupId === currentId && productGroup !== control.parent;
      });

      return isDuplicate ? { duplicateProduct: true } : null;
    };
  }

  addProductToAddOrder() {
    if (this.productsToSee.length === 0) return;

    const productFormGroup = new FormGroup({
      id: new FormControl('', [
        Validators.required,
        this.duplicateProductValidator()
      ]),
      name: new FormControl('', Validators.required),
      quantity: new FormControl('1', [Validators.required, Validators.min(1)]),
      price: new FormControl('', Validators.required),
      stock: new FormControl('', Validators.required)
    });

    this.productosArray.push(productFormGroup);
    this.calculatePrice();
  }

  onProductSelect(event: Event, index: number) {
    const selectedProductId = (event.target as HTMLSelectElement).value;
    this.productSelected = this.productsToSee.find(prod => prod.id === selectedProductId);
    
    if (this.productSelected) {
      const productFormGroup = this.productosArray.at(index) as FormGroup;
      productFormGroup.patchValue({
        id: this.productSelected.id,
        name: this.productSelected.name,
        quantity: 1,
        price: this.productSelected.price,
        stock: this.productSelected.stock
      });
    }
  }

  get productosArray(): FormArray {
    return this.form.get('productos') as FormArray;
  }

  // Método helper para verificar si un producto está duplicado
  isProductDuplicated(index: number): boolean {
    const currentGroup = this.productosArray.at(index) as FormGroup;
    return currentGroup.get('id')?.hasError('duplicateProduct') || false;
  }

  removeProduct(index: number) {
    this.productosArray.removeAt(index);
    this.calculatePrice();
  }

  calculatePrice() {
    this.totalPrice = 0; // Resetear el total antes de calcular
    
    this.productosArray.controls.forEach((element) => {
      const productGroup = element as FormGroup;
      const precio = productGroup.get('price')?.value || 0;
      const cantidad = productGroup.get('quantity')?.value || 0;
  if(precio!=0)
  {
    this.totalPrice += precio * cantidad;
  }
    });
    
    if (this.totalPrice > 1000) {
      this.totalPrice = this.totalPrice * 0.90;
    }
  }
  saveOrden() {
    console.log(this.form.value)
    this.orderService.postOrder(this.form.value).subscribe({
      next:()=>{
        alert("se registro con exito la orden")
      },
      error : (error)=>{
        alert(error)
      }
    })
    }
    isProductValid(index: number): boolean {
      const productGroup = this.productosArray.at(index) as FormGroup;
      const id = productGroup.get('id')?.value;
      const quantity = productGroup.get('quantity')?.value;
      
      return id && quantity > 0;
    }
}
  



