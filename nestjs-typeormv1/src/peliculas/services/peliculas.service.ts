import { Get, Injectable, Param } from '@nestjs/common';
import { Pelicula } from '../entities/pelicula.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PeliculasService {
    constructor(
        @InjectRepository(Pelicula) private peliculasRepository: Repository<Pelicula>,

    ) { }
    async findAll(): Promise<Pelicula[]> {
        console.log('Llegando');
        return this.peliculasRepository.find(); // Utiliza el método find() sin argumentos para obtener todas las entidades
    }
    async findByCategoria(categoriaId: number): Promise<Pelicula[]> {
        return this.peliculasRepository
          .createQueryBuilder('pelicula')
          .innerJoinAndSelect('pelicula.categorias', 'categoria')
          .where('categoria.id = :categoriaId', { categoriaId })
          .getMany();
      }
    
  }
  

