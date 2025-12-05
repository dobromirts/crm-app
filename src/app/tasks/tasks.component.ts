import { Component, OnDestroy, OnInit } from '@angular/core';
import { IGX_GRID_DIRECTIVES } from 'igniteui-angular';
import { Subject, takeUntil } from 'rxjs';
import { CategoryDto } from '../models/northwind-swagger/category-dto';
import { NorthwindSwaggerService } from '../services/northwind-swagger.service';

@Component({
  selector: 'app-tasks',
  imports: [IGX_GRID_DIRECTIVES],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public test = 2;
  public northwindSwaggerCategoryDto: CategoryDto[] = [];

  constructor(
    public northwindSwaggerService: NorthwindSwaggerService,
  ) {}


  ngOnInit() {
    this.northwindSwaggerService.getCategoryDtoList().pipe(takeUntil(this.destroy$)).subscribe(
      data => this.northwindSwaggerCategoryDto = data
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
