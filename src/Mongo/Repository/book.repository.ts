import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BookDTO } from "src/DTO/books.dto";
import { Book } from "../Interfaces/book.interface";

@Injectable()
export class BookRepository {

    constructor(
        @InjectModel('book') private readonly bookModel : Model<Book> 
    ){}


    async saveBook(newBook: BookDTO): Promise<Book>{
    const savedBook = new this.bookModel(newBook);
    return await savedBook.save()
}

async getAllBooks(): Promise<Book[]> {
    return await this.bookModel.find( {}, { __v : false}).sort({ name : +1}).exec();
}


async getBookById(bookID: string): Promise<Book>{
    return await this.bookModel.findById(bookID, { __v : false});
}

async deleteBookById(bookID: string): Promise<Book>{
    return await this.bookModel.findOneAndDelete({ _id:  bookID});
}

async updateBookById(bookID: string, newBook: Book): Promise<Book>{
    return await this.bookModel.replaceOne( { _id: bookID}, newBook);
}

async getBookByAuthorName(authorName: string[]): Promise<Book[]>{

    return await this.bookModel.find({
        $or :[
            {"author.name" : { $in: authorName }},
            {"author.surname" : {$in : authorName}}
        ]
    })


}

async getBookByName(bookName: string): Promise<Book[]>{

    return await this.bookModel.find({
        name : { '$regex' : bookName, '$options' : 'i'}
    }, {__v : false}
    )

}
}