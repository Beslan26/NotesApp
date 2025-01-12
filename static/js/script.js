$(document).ready(function() {
    // Загрузка списка заметок при загрузке страницы
    loadNotes();

    // Обработка отправки формы для создания новой заметки
    $("#createNoteForm").submit(function(event) {
        event.preventDefault();

        var title = $("#title").val();
        var text = $("#text").val();

        $.ajax({
            url: "/api/notes/",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({title: title, text: text}),
            success: function() {
                // После успешного создания заметки перезагружаем список
                loadNotes();
            }
        });
    });
});

// Функция для загрузки списка заметок и отображения на странице
function loadNotes() {
    $.ajax({
        url: "/api/notes/",
        type: "GET",
        success: function(data) {
            var notesList = $("#notesList");
            notesList.empty();

            // Проходим по каждой заметке и добавляем ее в список
            $.each(data, function(index, note) {
                var listItem = $("<li class='list-group-item'>").text(note.title + ": " + note.text);
                var deleteButton = $("<button class='btn btn-danger btn-sm float-right'>Delete</button>");

                // Обработка удаления заметки
                deleteButton.click(function() {
                    deleteNote(note.id);
                });

                listItem.append(deleteButton);
                notesList.append(listItem);
            });
        }
    });
}

// Функция для удаления заметки
function deleteNote(noteId) {
    $.ajax({
        url: "/api/notes/" + noteId + "/",
        type: "DELETE",
        success: function() {
            // После успешного удаления заметки перезагружаем список
            loadNotes();
        }
    });
}
