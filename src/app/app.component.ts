import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ItemsForm = new FormArray([
    new FormGroup({
      id: new FormControl(''),
      recomendacoes: new FormControl(''),
      irregularidades: new FormControl(''),
      prazo: new FormControl('')
    })
  ]);

  IrregularidadeForm = new FormArray([
    new FormGroup({
      item_id: new FormControl(5.1),
      descricao_item: new FormControl(''),
      items: new FormArray([])
    })
  ]);

  FormGroupIrregularidades = new FormGroup({
    irregularidades: this.IrregularidadeForm
  });

  irregularidades = this.FormGroupIrregularidades.get('irregularidades') as FormArray;
  items = this.irregularidades.controls[0].get('items') as FormArray;



  addIrregularidades() {
    const group = new FormGroup({
      item_id: new FormControl(`5.${((this.irregularidades.length + 1))}`),
      descricao_item: new FormControl(''),
      items: new FormArray([])
    });
    this.irregularidades.push(group);
  }
  removeIrregularidades(i) {
    if (confirm('Deseja deletar o grupo de Irregularidades? ')) {
      this.irregularidades.removeAt(i);
    }
  }

  addItem(i) {
    this.items = this.irregularidades.controls[i].get('items') as FormArray;
    const itemId = this.irregularidades.controls[i].get('item_id').value;
    const group = new FormGroup({
      id: new FormControl(`${itemId}.${(this.items.length + 1)}`),
      recomendacoes: new FormControl(''),
      irregularidades: new FormControl(''),
      prazo: new FormControl('')
    });
    this.items.push(group);
  }
  setItem(data, contIrregularidade, contItem) {
    this.irregularidades.controls[contIrregularidade].get('items')['controls'][contItem].setValue(data);
  }
  removeItem(data, contIrregularidade, contItem) {
    if (confirm('Deseja deletar o item? ')) {
      this.items = this.irregularidades.controls[contIrregularidade].get('items') as FormArray;
      this.items.removeAt(contItem);
    }
  }
}

