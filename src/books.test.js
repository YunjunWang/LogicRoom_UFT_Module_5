import BooksPresenter from "./Books/BooksPresenter";
import booksRepository from "./Books/BooksRepository";
import httpGateway from "./Shared/HttpGateway";
import Observable from "./Shared/Observable";

describe("books test", async () => {
  let viewModel;
  let booksPresenter;
  let booksStub;
  let allBooksStub;

  const privateUrl = "https://api.logicroom.co/api/pete@logicroom.co/books";
  const publicUrl = "https://api.logicroom.co/api/pete@logicroom.co/allbooks";

  beforeEach(async () => {
    viewModel = null;
    booksPresenter = new BooksPresenter();
    booksRepository.programmersModel = new Observable([]);
    booksStub = {
      success: true,
      result: [
        {
          bookId: 20991,
          name: "Wind in the willows",
          ownerId: "pete@logicroom.co",
          author: "Kenneth Graeme"
        },
        {
          bookId: 21001,
          name: "I, Robot",
          ownerId: "pete@logicroom.co",
          author: "Isaac Asimov"
        },
        {
          bookId: 21011,
          name: "The Hobbit",
          ownerId: "pete@logicroom.co",
          author: "Jrr Tolkein"
        },
        {
          bookId: 21021,
          name: "Ultra Fast Testing",
          ownerId: "pete@logicroom.co",
          author: "Pete Heard"
        },
        {
          bookId: 21031,
          name: "Ultra Fast Testing",
          ownerId: "pete@logicroom.co",
          author: "Pete Heard"
        }
      ]
    };
    allBooksStub = {
      success: true,
      result: [
        {
          bookId: 31,
          name: "Moby Dick",
          ownerId: null,
          author: "Herman Melville"
        },
        {
          bookId: 41,
          name: "The Art of War",
          ownerId: null,
          author: "Sun Tzu"
        },
        {
          bookId: 20991,
          name: "Wind in the willows",
          ownerId: "pete@logicroom.co",
          author: "Kenneth Graeme"
        },
        {
          bookId: 21001,
          name: "I, Robot",
          ownerId: "pete@logicroom.co",
          author: "Isaac Asimov"
        },
        {
          bookId: 21011,
          name: "The Hobbit",
          ownerId: "pete@logicroom.co",
          author: "Jrr Tolkein"
        },
        {
          bookId: 21021,
          name: "Ultra Fast Testing",
          ownerId: "pete@logicroom.co",
          author: "Pete Heard"
        },
        {
          bookId: 21031,
          name: "Ultra Fast Testing",
          ownerId: "pete@logicroom.co",
          author: "Pete Heard"
        }
      ]
    };

    httpGateway.get = jest.fn().mockImplementation((path) => {
      if (path === privateUrl) {
        return Promise.resolve(booksStub);
      } else if (path === publicUrl) {
        return Promise.resolve(allBooksStub);
      }
    });
  });

  let setUp = async (userModeArg) => {
    await booksPresenter.setMode(userModeArg);
    await booksPresenter.load((generatedViewModel) => {
      viewModel = generatedViewModel;
    });
  };

  describe("visibility test", () => {
    it("should load private books", async () => {
      const expectedResult = [
        {
          name: "Wind in the willows",
          author: "Kenneth Graeme"
        },
        {
          name: "I, Robot",
          author: "Isaac Asimov"
        },
        {
          name: "The Hobbit",
          author: "Jrr Tolkein"
        },
        {
          name: "Ultra Fast Testing",
          author: "Pete Heard"
        },
        {
          name: "Ultra Fast Testing",
          author: "Pete Heard"
        }
      ];
      await setUp("private");

      expect(httpGateway.get).toHaveBeenCalledWith(privateUrl);
      expect(viewModel.length).toBe(5);
      expect(viewModel).toMatchObject(expectedResult);
    });

    it("should load public books", async () => {
      const expectedResult = [
        {
          name: "Moby Dick",
          author: "Herman Melville"
        },
        {
          name: "The Art of War",
          author: "Sun Tzu"
        },
        {
          name: "Wind in the willows",
          author: "Kenneth Graeme"
        },
        {
          name: "I, Robot",
          author: "Isaac Asimov"
        },
        {
          name: "The Hobbit",
          author: "Jrr Tolkein"
        },
        {
          name: "Ultra Fast Testing",
          author: "Pete Heard"
        },
        {
          name: "Ultra Fast Testing",
          author: "Pete Heard"
        }
      ];
      await setUp("public");

      expect(httpGateway.get).toHaveBeenCalledWith(publicUrl);
      expect(viewModel.length).toBe(7);
      expect(viewModel).toMatchObject(expectedResult);
    });
  });

  describe("sorting books test", () => {});
});
