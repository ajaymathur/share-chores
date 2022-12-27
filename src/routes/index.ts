import { Context } from "koa";
import Router from "koa-router";
import { Chores } from "../models/chores-model";
import { Rooms } from "../models/rooms-model";
import { User } from "../models/users-model";


export function routes(route: Router) {
    route.get('/healthcheck', ctx => {
        ctx.body = "Success\n"
    });

    route.post('/create-user', async ctx => {
        console.log(ctx.request.body);
        const { username, email } = ctx.request.body as { username: string, email: string};
        await User.create({
            username,
            email,
            rooms: [],
            chores: []
        })
        ctx.body = "user created";
    });

    route.post('/create-room', async ctx => {
        const { name, admin, chores } = ctx.request.body as { name: string, admin: string, chores: string};
        const room = await Rooms.create({
            name,
            admin,
            chores: [],
            members: []
        });

        const user = await User.findByPk(admin);
        await user.update({rooms: [...user.rooms, room.id]});
        await user.save();

        ctx.body = "room created";
    });

    route.post('/add-user-to-room', async ctx => {
        const { username, roomId } = ctx.request.body as { username: string, roomId: number };
        const room = await Rooms.findByPk(roomId);
        await room.update({ members: [ ...room.members, username ] });
        await room.save();

        const user = await User.findByPk(username);
        await user.update({ rooms: [...user.rooms, roomId] });
        await user.save();

        ctx.body = "user added to room";
    });

    route.post('/add-chore', async ctx => {
        const { title, roomId, creator, assignee } = ctx.request.body as { title: string, roomId: string, creator: string, assignee: string };
        const chore = await Chores.create({
            title,
            category: '',
            createdBy: creator,
            room: roomId,
            assignee
        });

        const room = await Rooms.findByPk(roomId);
        await room.update({ chores: [ ...room.chores, chore.id ] });
        await room.save();

        const user = await User.findByPk(assignee);
        await user.update({ chores: [...user.chores, chore.id] });
        await user.save();

        ctx.body = "Chore added";
    });
}
