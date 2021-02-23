import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { BookDTO } from 'src/DTO/books.dto';
import { Book } from 'src/Mongo/Interfaces/book.interface';
import { BookRepository } from 'src/Mongo/Repository/book.repository';

@Injectable()
export class BooksService {

constructor(
    private readonly bookRepository : BookRepository
){}

async getAllBooks(): Promise<Book[]>{
    const allBooks = await this.bookRepository.getAllBooks();

    if(!allBooks.length)
        throw new BadGatewayException('There are no books registered yet');
    
    return allBooks;
}

async saveBook(newBook: BookDTO): Promise<Book>{
     return await this.bookRepository.saveBook(newBook);
 }   


async getBookById(bookID: string): Promise<Book>{
   
    try {
        const existBook = await this.bookRepository.getBookById(bookID);

        if(!existBook)
            throw new BadRequestException('There are no results');
        
        return existBook;
    } catch (error) {
        throw new BadRequestException('There are no results');
    }

}


async deleteBookById(bookID: string): Promise<Book>{

    try {
        return await this.bookRepository.deleteBookById(bookID)
    } catch (e) {
        throw new BadRequestException('This book does not exists');
    }
}

async updateBookById(bookID: string, newBook: Book): Promise<Book>{

    const existBook = await this.bookRepository.getBookById(bookID);

        if(!existBook)
            throw new BadRequestException('There are no results');
        
       const updateBook = await this.bookRepository.updateBookById(bookID, newBook);

       if(updateBook)
        return this.bookRepository.getBookById(bookID);
       else
            throw new BadRequestException('Error in update')
}

async getBookByAuthorName(authorName: string): Promise<Book[]>{

    const splitedAuthorName = authorName.split(' ')

    const foundBooks = await this.bookRepository.getBookByAuthorName(splitedAuthorName);

    if(!foundBooks.length)
        throw new BadRequestException('No result for this author');
    
    return foundBooks;
}

async getBookByName(bookName: string): Promise<Book[]>{
    const foundBooks = await this.bookRepository.getBookByName(bookName);

    if(!foundBooks.length)
        throw new BadRequestException('No result for this name');
    
    return foundBooks;
}

}