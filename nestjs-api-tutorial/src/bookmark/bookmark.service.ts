import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookmarkDTO, EditBookmarkDTO } from './dto';

@Injectable()
export class BookmarkService {
  constructor(private prismaService: PrismaService) {}

  getBookmarks(userId: number) {
    return this.prismaService.bookmark.findMany({
      where: {
        id: userId,
      },
    });
  }

  getBookmarkById(userId: number, bookmarkId: number) {
    return this.prismaService.bookmark.findUnique({
      where: {
        id: userId,
      },
    });
  }
  createBookmark(userId: number, dto: CreateBookmarkDTO) { }
  editBookmarkById(userId: number, bookmarkId: number,dto: EditBookmarkDTO) { }
  deleteBookmarkById(userId: number, bookmarkId: number) { }
}
